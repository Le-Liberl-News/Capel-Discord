const {beerNearby}=require('../activity/tavern-world.cjs');
const {appliquerStatuts}=require('../rpg/systemeStatuts');
const {estAlcoolise}=require('../rpg/alcool');
function createActivityTavern({state,stats,save,announce,now=Date.now}){
 return {async drink({id,character,player,channel}){
  if(channel!=='map:anterose'||player.hp===0||!beerNearby(player))return {error:'Approchez-vous de la bi\u00e8re.'};
  if(!Object.hasOwn(require('../activity/assets/sky/characters.json'),character))return {error:'Personnage indisponible.'};
  const base=Object.hasOwn(stats,character)?stats[character]:stats.default;
  state.players??={};const p=state.players[character]??={hpActuel:base.hpMax,PCActuel:base.PCMax,statuts:[]};
  p.activityDrinks??={count:0,at:0,last:-1e15,ids:[]};const drinks=p.activityDrinks;
  if(drinks.ids.includes(id))return {message:'Bi\u00e8re bue.'};
  const time=now();if(time-drinks.last<4000)return {error:'Attendez un instant avant de boire.'};
  drinks.ids.push(id);drinks.ids=drinks.ids.slice(-128);if(time-drinks.at>600000)drinks.count=0;
  drinks.at=time;drinks.last=time;drinks.count++;const wasDrunk=estAlcoolise(p);
  if(drinks.count>=3){p.statuts??=[];appliquerStatuts(p,[{nom:'alcoolise',duree:6}],character);drinks.count=0;}
  save();
  if(!wasDrunk&&estAlcoolise(p))await announce({character,text:character+' a trop bu et est maintenant saoul.'}).catch(error=>console.error('Activity drunkenness announcement failed:',error.code??'unavailable'));
  return {message:'Bi\u00e8re bue.',text:estAlcoolise(p)?'Hips !':'Boit une bi\u00e8re.',speaker:player.id,character,drunk:estAlcoolise(p)};
 }};
}
module.exports={createActivityTavern};
