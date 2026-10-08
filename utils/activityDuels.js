const { randomBytes } = require("node:crypto");
const { ActivityError } = require("./activityService");
class DuelError extends Error {}
function createActivityDuels({ lobby, resolveCharacter, resolveOpponent, characterNames, store = null, now = Date.now }) {
  const invitations = new Map(), lastInvite = new Map();
  for (const [id,invitation] of store?.load() ?? []) if (invitation.expires>now()) invitations.set(id,invitation);
  const persist=()=>store?.save([...invitations]);
  const prune = () => { for (const [id,i] of invitations) if (i.expires<now()) { invitations.delete(id); lobby.cancelDuel(id); persist(); } };
  return {
    async handle(interaction) {
      if (interaction.isAutocomplete?.() && interaction.commandName === "duel") {
        const text=interaction.options.getFocused().toLocaleLowerCase("fr");
        await interaction.respond(characterNames.filter(n=>n.toLocaleLowerCase("fr").includes(text)).slice(0,25).map(name=>({name,value:name}))); return true;
      }
      if (interaction.isChatInputCommand?.() && interaction.commandName === "duel") {
        await interaction.deferReply({flags:64}); prune();
        let id, created = false;
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
          if (!existing) { lobby.createDuel({id,channel:interaction.channelId,players}); created = true; }
          invitations.set(id,{players,names:players.map(user=>user===interaction.user.id?own:name),expires:existing?.expires ?? now()+30*60*1000}); persist();
          const row={type:1,components:[{type:2,custom_id:"activity:"+id,label:"Rejoindre le duel",style:1}]};
          // DM messages contain no mention or identity of the other participant.
          const opponent=await interaction.client.users.fetch(target);
          await opponent.send({content:own+" te défie dans l'arène de Grancel. Plusieurs Poms t'y attendent.",components:[row],allowedMentions:{parse:[]}});
          await interaction.user.send({content:"Ton duel contre "+name+" est prêt dans l'arène de Grancel.",components:[row],allowedMentions:{parse:[]}});
          if (created) await interaction.channel.send({content:own+" défie "+name+" dans l'arène de Grancel ! Les invitations sont privées.",allowedMentions:{parse:[]}});
          lastInvite.set(interaction.user.id,now());
          await interaction.editReply({content:"Défi envoyé à "+name+". Ouvre le bouton reçu en message privé."});
        } catch(error) {
          if (created) { invitations.delete(id); lobby.cancelDuel(id); persist(); }
          await interaction.editReply({content:error.code===50007?"Les messages privés doivent être ouverts pour les deux joueurs.":error instanceof DuelError || error instanceof ActivityError ? error.message : "Impossible d'envoyer les invitations Discord. Réessayez dans un instant."});
        }
        return true;
      }
      if (interaction.isButton?.() && interaction.customId.startsWith("activity:duel:")) {
        prune(); const id=interaction.customId.slice(9), invitation=invitations.get(id);
        if (!invitation?.players.includes(interaction.user.id)) { await interaction.reply({content:"Invitation expirée ou inaccessible.",flags:64}); return true; }
        try {
          if (await resolveCharacter(interaction.user.id) !== invitation.names[invitation.players.indexOf(interaction.user.id)]) throw new DuelError("Votre personnage du jour a changé.");
          lobby.joinDuel(id,interaction.user.id);
          // Launch only inside the participant's private conversation with the bot.
          if (!interaction.channel?.isDMBased?.()) throw new DuelError("Ouvrez votre invitation privée.");
          await interaction.launchActivity();
        } catch(error) {
          lobby.leaveDuel(interaction.user.id);
          if (!interaction.replied) await interaction.reply({content:"Lancement impossible. Ouvrez votre invitation privée puis réessayez.",flags:64});
        }
        return true;
      }
      return false;
    },
  };
}
module.exports={createActivityDuels};
