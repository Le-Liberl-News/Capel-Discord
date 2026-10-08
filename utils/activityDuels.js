const { randomBytes } = require("node:crypto");
const { ActivityError } = require("./activityService");
class DuelError extends Error {}
function createActivityDuels({ lobby, resolveCharacter, resolveOpponent, characterNames, store = null, spectatorChannel = "595259248984981516", now = Date.now }) {
  const invitations = new Map(), lastInvite = new Map();
  for (const [id,invitation] of store?.load() ?? []) if (invitation.expires>now()) invitations.set(id,invitation);
  const announcing = new Set();
  const persist=()=>store?.save([...invitations]);
  async function announce(id,invitation,client) {
    if(invitation.announced || announcing.has(id))return;
    announcing.add(id);
    try {
      const channel=await client.channels.fetch(spectatorChannel);
      const message=await channel.send({content:invitation.names.join(" contre ")+" : le duel commence dans l'arène de Grancel !",components:[{type:1,components:[{type:2,custom_id:"activity:watch:"+id,label:"Regarder depuis les tribunes",style:1}]}],allowedMentions:{parse:[]}});
      invitation.announced=message.id??true;persist();
    } finally {announcing.delete(id);}
  }
  const prune = () => { for (const [id,i] of invitations) if (i.expires<now()) { invitations.delete(id); lobby.cancelDuel(id); persist(); } };
  return {
    async handle(interaction) {
      if (interaction.isAutocomplete?.() && interaction.commandName === "duel") {
        const text=interaction.options.getFocused().toLocaleLowerCase("fr");
        await interaction.respond(characterNames.filter(n=>n.toLocaleLowerCase("fr").includes(text)).slice(0,25).map(name=>({name,value:name}))); return true;
      }
      if (interaction.isChatInputCommand?.() && interaction.commandName === "duel") {
        await interaction.deferReply({flags:64}); prune();
        let id, created = false, delivered = false;
        try {
          if (now() - (lastInvite.get(interaction.user.id) ?? -Infinity) < 30000) throw new DuelError("Attendez 30 secondes entre deux défis.");
          const requested=interaction.options.getString("personnage",true);
          const name=characterNames.find(n=>n.toLocaleLowerCase("fr")===requested.toLocaleLowerCase("fr"));
          const target=name && await resolveOpponent(name);
          if (!target || target===interaction.user.id) throw new DuelError("Choisissez un autre personnage attribué aujourd'hui.");
          const own=await resolveCharacter(interaction.user.id);
          const existing = lobby.findDuel([interaction.user.id, target], interaction.channelId);
          if (!existing && invitations.size >= 100) throw new DuelError("Trop de défis en attente. Réessayez plus tard.");
          id=existing?.id ?? "duel:"+randomBytes(16).toString("hex");
          const players=existing?.players ?? [interaction.user.id,target];
          if (!existing) { lobby.prepareDuel(interaction.user.id, target); lobby.createDuel({id,channel:interaction.channelId,players}); created = true; }
          invitations.set(id,{...invitations.get(id),players,names:players.map(user=>user===interaction.user.id?own:name),expires:existing?.expires ?? now()+30*60*1000}); persist();
          const row={type:1,components:[{type:2,custom_id:"activity:"+id,label:"Rejoindre le duel",style:1}]};
          // DM messages contain no mention or identity of the other participant.
          const deliveries = await Promise.allSettled([
            (async () => { const opponent = await interaction.client.users.fetch(target); await opponent.send({content:own+" te défie dans l'arène de Grancel. Plusieurs Poms t'y attendent.",components:[row],allowedMentions:{parse:[]}}); })(),
            (async () => interaction.user.send({content:"Ton duel contre "+name+" est prêt dans l'arène de Grancel.",components:[row],allowedMentions:{parse:[]}}))(),
          ]);
          delivered = deliveries.some(result => result.status === "fulfilled");
          if (!delivered) throw new DuelError(deliveries.some(result => result.reason?.code === 50007)
            ? "Impossible d'envoyer les invitations privées. Ouvrez vos messages privés au bot puis relancez /duel."
            : "Aucune invitation n'a pu être envoyée. Réessayez dans un instant.");
          lastInvite.set(interaction.user.id,now());
          let content;
          if (deliveries[0].status === "rejected") {
            content = "Ton invitation reste valide, mais celle de "+name+" n'a pas pu être envoyée. "+(deliveries[0].reason?.code === 50007 ? "Ce personnage doit ouvrir ses messages privés au bot. " : "Discord a refusé l'envoi. ")+"Relance /duel dans 30 secondes pour renvoyer les invitations.";
          } else if (deliveries[1].status === "rejected") {
            content = "L'invitation de "+name+" reste valide, mais je n'ai pas pu t'envoyer la tienne. "+(deliveries[1].reason?.code === 50007 ? "Ouvre tes messages privés au bot. " : "Discord a refusé l'envoi. ")+"Relance /duel dans 30 secondes pour la recevoir.";
          } else {
            content = "Défi envoyé à "+name+". Ouvre le bouton reçu en message privé.";
            if (created) {
              try { await interaction.channel.send({content:own+" défie "+name+" dans l'arène de Grancel ! Les invitations sont privées.",allowedMentions:{parse:[]}}); }
              catch { content += " L'annonce dans le salon n'a pas pu être publiée ; les invitations privées restent valides."; }
            }
          }
          await interaction.editReply({content});
        } catch(error) {
          if (created && !delivered) { invitations.delete(id); lobby.cancelDuel(id); persist(); }
          await interaction.editReply({content:delivered?"Les invitations envoyées restent valides. La confirmation Discord a échoué.":error.code===50007?"Les messages privés doivent être ouverts pour les deux joueurs.":error instanceof DuelError || error instanceof ActivityError ? error.message : "Impossible d'envoyer les invitations Discord. Réessayez dans un instant."});
        }
        return true;
      }
      if (interaction.isButton?.() && interaction.customId.startsWith("activity:duel:")) {
        prune(); const id=interaction.customId.slice(9), invitation=invitations.get(id);
        if (!invitation?.players.includes(interaction.user.id)) { await interaction.reply({content:"Invitation expirée ou inaccessible.",flags:64}); return true; }
        try {
          if (await resolveCharacter(interaction.user.id) !== invitation.names[invitation.players.indexOf(interaction.user.id)]) throw new DuelError("Votre personnage du jour a changé.");
          // Launch only inside the participant's private conversation with the bot.
          if (!interaction.channel?.isDMBased?.()) throw new DuelError("Ouvrez votre invitation privée.");
          lobby.joinDuel(id,interaction.user.id);
          await interaction.launchActivity();
          const ready=lobby.acceptDuel(id,interaction.user.id);
          if(ready && interaction.client?.channels) {
            try { await announce(id,invitation,interaction.client); }
            catch { /* Keep the accepted duel; a retry can publish the announcement. */ }
          }
        } catch(error) {
          lobby.leaveDuel(interaction.user.id);
          if (!interaction.replied) await interaction.reply({content:"Lancement impossible. Ouvrez votre invitation privée puis réessayez.",flags:64});
        }
        return true;
      }
      if(interaction.isButton?.() && interaction.customId.startsWith("activity:watch:duel:")) {
        try { const id=interaction.customId.slice("activity:watch:".length); lobby.validateSpectate(id); await interaction.launchActivity(); lobby.spectateDuel(id,interaction.user.id); }
        catch(error) { if(!interaction.replied) await interaction.reply({content:error instanceof ActivityError?error.message:"Fermez votre activité actuelle puis réessayez ce bouton.",flags:64}); }
        return true;
      }
      return false;
    },
  };
}
module.exports={createActivityDuels};
