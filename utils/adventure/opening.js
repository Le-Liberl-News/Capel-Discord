const path=require('node:path');
const OPENS_AT=Date.UTC(2026,9,30,19);
const ANNOUNCEMENTS='915557045774716969';
function announcement(link){return `@everyone

Bonsoir à tous,

En 2022, nous avons traduit un jeu d'aventure de Falcom (Horror House) sorti à l'origine en 1983, à l'occasion d'Halloween. Mais la barrière pour y jouer est assez haute : se procurer la rom, manipuler un émulateur, rentrer les commandes dans un analyseur très limité.

Pour Halloween de cette année nous avons décidé de proposer une expérience semblable mais complètement originale. Vous pouvez d'ores et déjà y participer en suivant [ce lien](${link}). L'aventure, appelée *Dolce Traccia*, a été entièrement écrite par **Aisoce** (<@369731837053894656>) et se complète en quelques heures entièrement sur Discord. N'hésitez pas (surtout si vous êtes bloqués) à discuter avec les autres participants dans le salon dédié <#1563508228019454024>. Nous espérons que vous serez nombreux à l'essayer !`;}
function createOpening({client,adventure,store,now=Date.now}){
 const state=store.load()||{};let running=false;
 return async function tick(){
  if(running||state.message||now()<OPENS_AT||!client.isReady())return;
  running=true;
  try{
   const invitation=await adventure.publishInvitation();
   if(!invitation.message)throw Error('Invitation non confirmée');
   const channel=await client.channels.fetch(ANNOUNCEMENTS);
   const link=`https://discord.com/channels/${channel.guildId}/${invitation.channel}/${invitation.message}`;
   const sent=await channel.send({content:announcement(link),files:[{attachment:path.join(__dirname,'../../rpg/data/aventure/announcement/dolce-traccia.png'),name:'dolce-traccia.png'}],allowedMentions:{parse:['everyone'],users:['369731837053894656']},nonce:'dolce-announce-20261030',enforceNonce:true});
   state.message=sent.id;state.invitation=invitation.message;store.save(state);
  }finally{running=false;}
 };
}
function scheduleOpening(options){
 let retryAt=0;
 const tick=createOpening(options),run=()=>{if(Date.now()<retryAt)return;return tick().catch(error=>{retryAt=Date.now()+30000;console.error('Ouverture Dolce Traccia impossible :',error.code||error.status||'erreur');});};
 options.client.once('clientReady',run);
 const timer=setInterval(run,1000);timer.unref();return timer;
}
module.exports={OPENS_AT,announcement,createOpening,scheduleOpening};
