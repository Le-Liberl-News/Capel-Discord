import definitions from './assets/sky/combat/solo-encounters.json';
import combat from './native-combat.cjs';
export function soloCandidates(catalogue){return Object.keys(catalogue).filter(name=>!!combat.combatSpec(name,'craft'));}
export function pickSoloEncounter(catalogue,{random=Math.random,forced=null,config=definitions,allowedCharacters=null}={}){
 const allowed=allowedCharacters===null?null:new Set(allowedCharacters),permitted=name=>!allowed||allowed.has(name);
 const candidates=soloCandidates(catalogue).filter(permitted);if(!candidates.length)throw Error('Aucun adversaire avec craft débloqué par vos rôles de jeux terminés.');
 const valid=member=>{const name=typeof member==='string'?member:member?.character;return permitted(name)&&!!catalogue[name]&&(member?.monster?['Mishy','MishyArdent'].includes(name):!!combat.combatSpec(name,'basic')||!!combat.combatSpec(name,'craft'));};
 const groups=config.groups.filter(g=>g.enemies?.length&&[...(g.allies??[]),...g.enemies].every(valid));
 if(forced&&candidates.includes(forced))return {opponent:forced,encounter:null,label:forced+' (IA)'};
 const chosen=groups.find(g=>g.id===forced)??(groups.length&&random()<config.groupChance?groups[Math.min(groups.length-1,Math.floor(random()*groups.length))]:null);
 if(chosen)return {opponent:null,encounter:chosen,label:chosen.name};
 const opponent=candidates[Math.min(candidates.length-1,Math.floor(random()*candidates.length))];return {opponent,encounter:null,label:opponent+' (IA)'};
}
