const { randomBytes } = require("node:crypto");
const { ActivityError } = require("./activityService");
class DuelError extends Error {}
function createActivityDuels({ lobby, resolveCharacter, resolveOpponent, characterNames, store = null, spectatorChannel = "1558125759682576475", now = Date.now }) {
  const invitations = new Map(), lastInvite = new Map();
  for (const [id,invitation] of store?.load() ?? []) if (invitation.expires>now()) invitations.set(id,invitation);
  const announcing = new Map();
  const persist=()=>store?.save([...invitations]);
  async function announce(id,invitation,client) {
    if(invitation.thread&&invitation.announced){lobby.setDuelThread?.(id,invitation.thread);return invitation.thread;}
    if(announcing.has(id))return announcing.get(id);
    const operation=(async()=>{
      let thread;
      if(invitation.thread)thread=await client.channels.fetch(invitation.thread);
      else {
        const channel=await client.channels.fetch(spectatorChannel);
        thread=await channel.threads.create({name:invitation.names.join(' contre ').slice(0,100),type:11,autoArchiveDuration:1440,reason:'Match dans l\u2019activit\u00e9'});
        invitation.thread=thread.id;persist();
      }
      lobby.setDuelThread?.(id,thread.id);
      const message=await thread.send({content:invitation.names.join(' contre ')+" : le duel commence dans l\u2019ar\u00e8ne de Grancel !",components:[{type:1,components:[{type:2,custom_id:'activity:watch:'+id,label:'Regarder depuis les tribunes',style:1}]}],allowedMentions:{parse:[]}});
      invitation.announced=message.id??true;persist();return thread.id;
    })();
    announcing.set(id,operation);
    try{return await operation;}finally{announcing.delete(id);}
  }
  const prune = () => { for (const [id,i] of invitations) if (i.expires<now()) { invitations.delete(id); lobby.cancelDuel(id); persist(); } };
  async function invite({user,client,channel,channelId,requested,inGame=false}) {
    prune();
        let id, created = false, delivered = false;
        try {
          if (now() - (lastInvite.get(user.id) ?? -Infinity) < 30000) throw new DuelError("Attendez 30 secondes entre deux défis.");

          const name=characterNames.find(n=>n.toLocaleLowerCase("fr")===requested.toLocaleLowerCase("fr"));
          const target=name && await resolveOpponent(name);
          if (!target || target===user.id) throw new DuelError("Choisissez un autre personnage attribué aujourd'hui.");
          const own=await resolveCharacter(user.id);
          const existing = lobby.findDuel([user.id, target], channelId);
          if (!existing && invitations.size >= 100) throw new DuelError("Trop de défis en attente. Réessayez plus tard.");
          id=existing?.id ?? "duel:"+randomBytes(16).toString("hex");
          const players=existing?.players ?? [user.id,target];
          if (!existing) { lobby.prepareDuel(user.id, target); lobby.createDuel({id,channel:channelId,players,names:players.map(playerId=>playerId===user.id?own:name)}); created = true; }
          invitations.set(id,{...invitations.get(id),players,names:players.map(playerId=>playerId===user.id?own:name),expires:existing?.expires ?? now()+30*60*1000}); persist();
          const row={type:1,components:[{type:2,custom_id:"activity:"+id,label:"Rejoindre le duel",style:1}]};
          // DM messages contain no mention or identity of the other participant.
          const deliveries = await Promise.allSettled([
            (async () => { if(inGame && lobby.isConnected(target))return; const opponent = await client.users.fetch(target); await opponent.send({content:own+" te défie dans l'arène de Grancel. Plusieurs Poms t'y attendent.",components:[row],allowedMentions:{parse:[]}}); })(),
            (async () => inGame ? undefined : user.send({content:"Ton duel contre "+name+" est prêt dans l'arène de Grancel.",components:[row],allowedMentions:{parse:[]}}))(),
          ]);
          delivered = inGame ? deliveries[0].status === "fulfilled" : deliveries.some(result => result.status === "fulfilled");
          if (!delivered) throw new DuelError(deliveries.some(result => result.reason?.code === 50007)
            ? "Impossible d'envoyer les invitations privées. Ouvrez vos messages privés au bot puis relancez /duel."
            : "Aucune invitation n'a pu être envoyée. Réessayez dans un instant.");
          lastInvite.set(user.id,now());
          let content;
          if (deliveries[0].status === "rejected") {
            content = "Ton invitation reste valide, mais celle de "+name+" n'a pas pu être envoyée. "+(deliveries[0].reason?.code === 50007 ? "Ce personnage doit ouvrir ses messages privés au bot. " : "Discord a refusé l'envoi. ")+"Relance /duel dans 30 secondes pour renvoyer les invitations.";
          } else if (deliveries[1].status === "rejected") {
            content = "L'invitation de "+name+" reste valide, mais je n'ai pas pu t'envoyer la tienne. "+(deliveries[1].reason?.code === 50007 ? "Ouvre tes messages privés au bot. " : "Discord a refusé l'envoi. ")+"Relance /duel dans 30 secondes pour la recevoir.";
          } else {
            content = "Défi envoyé à "+name+". Ouvre le bouton reçu en message privé.";
            if (created && !inGame) {
              try { await channel.send({content:own+" défie "+name+" dans l'arène de Grancel ! Les invitations sont privées.",allowedMentions:{parse:[]}}); }
              catch { content += " L'annonce dans le salon n'a pas pu être publiée ; les invitations privées restent valides."; }
            }
          }
          return {id,content};
        } catch(error) {
          if (created && !delivered) { invitations.delete(id); lobby.cancelDuel(id); persist(); }
          if(inGame && !delivered)throw error;
          return {id,content:delivered?"Les invitations envoyées restent valides. La confirmation Discord a échoué.":error.code===50007?"Les messages privés doivent être ouverts pour les deux joueurs.":error instanceof DuelError || error instanceof ActivityError ? error.message : "Impossible d'envoyer les invitations Discord. Réessayez dans un instant."};
        }
  }
  return {
    async publishResult(event,client){const thread=await client.channels.fetch(await this.publicationThread(event.id,client));return thread.send({content:"Victoire de **"+event.winnerName+"** !",allowedMentions:{parse:[]},nonce:BigInt('0x'+require('node:crypto').createHash('sha256').update(event.captureId).digest('hex').slice(0,16)).toString(),enforceNonce:true});},
    async publicationThread(id,client) {const invitation=invitations.get(id);if(!invitation)throw new ActivityError('Match introuvable.',404);if(invitation.thread&&invitation.announced)return invitation.thread;lobby.validateSpectate(id);return announce(id,invitation,client);},
    pending(user) { prune();return [...invitations].filter(([id,i])=>i.players.includes(user)&&lobby.duelStatus(id,user)?.accepted===false).map(([id,i])=>({id,opponent:i.names[i.players[0]===user?1:0]})); },
    async challenge(user,requested,client) {const result=await invite({user,client,requested,channelId:spectatorChannel,inGame:true});if(!result.id)throw new DuelError(result.content);lobby.joinDuel(result.id,user.id);lobby.acceptDuel(result.id,user.id);return {message:"D\u00e9fi envoy\u00e9.",id:result.id};},
    async accept(id,user,client) {prune();const i=invitations.get(id);if(!i?.players.includes(user))throw new ActivityError("Invitation expir\u00e9e.",403);if(await resolveCharacter(user)!==i.names[i.players.indexOf(user)])throw new ActivityError("Votre personnage a chang\u00e9.",403);lobby.joinDuel(id,user);if(lobby.acceptDuel(id,user))await announce(id,i,client).catch(error=>console.error('Activity match thread failed:',error.code??'unavailable'));return {message:"Duel rejoint."};},
    decline(id,user) {prune();const i=invitations.get(id);if(!i?.players.includes(user))throw new ActivityError("Invitation inaccessible.",403);lobby.cancelDuel(id);invitations.delete(id);persist();return {message:"D\u00e9fi refus\u00e9."};},
    async handle(interaction) {
      if (interaction.isAutocomplete?.() && interaction.commandName === "duel") {
        const text=interaction.options.getFocused().toLocaleLowerCase("fr");
        await interaction.respond(characterNames.filter(n=>n.toLocaleLowerCase("fr").includes(text)).slice(0,25).map(name=>({name,value:name}))); return true;
      }
      if (interaction.isChatInputCommand?.() && interaction.commandName === "duel") {
        await interaction.deferReply({flags:64}); prune();
        const result=await invite({user:interaction.user,client:interaction.client,channel:interaction.channel,channelId:interaction.channelId,requested:interaction.options.getString("personnage",true)});
        try {await interaction.editReply({content:result.content});}catch{await interaction.editReply({content:"Les invitations envoy\u00e9es restent valides. La confirmation Discord a \u00e9chou\u00e9."});}
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
            catch(error) { console.error('Activity match thread failed:',error.code??'unavailable'); }
          }
        } catch(error) {
          lobby.leaveDuel(interaction.user.id);
          if (!interaction.replied) await interaction.reply({content:"Lancement impossible. Ouvrez votre invitation privée puis réessayez.",flags:64});
        }
        return true;
      }
      if(interaction.isButton?.() && interaction.customId.startsWith("activity:watch:duel:")) {
        try { const id=interaction.customId.slice("activity:watch:".length); lobby.validateSpectate(id); if(lobby.isConnected(interaction.user.id)) { lobby.spectateDuel(id,interaction.user.id); await interaction.reply({content:"Vous rejoignez les tribunes dans votre activité déjà ouverte.",flags:64}); } else { await interaction.launchActivity(); lobby.spectateDuel(id,interaction.user.id); } }
        catch(error) { if(!interaction.replied) await interaction.reply({content:error instanceof ActivityError?error.message:"Fermez votre activité actuelle puis réessayez ce bouton.",flags:64}); }
        return true;
      }
      return false;
    },
  };
}
module.exports={createActivityDuels};
