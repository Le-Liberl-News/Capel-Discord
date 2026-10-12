const TABLE={x:-10,y:1.5,z:-1};
const LINES=[['schera','Schéra',"Oh mince, c'est fini pour Olivier."],['aina','Aina','Il ne faut pas vous forcer\nsi vous vous sentez mal.'],['olivier','Olivier','Eh, hrrrrm...']];
function nearby(p){return !!p&&Math.hypot(p.x-TABLE.x,p.z-TABLE.z)<=3&&Math.abs(p.y-TABLE.y)<1;}
function createDrinkingDialogue({now=Date.now,random=Math.random}={}){let next=now()+25000+random()*10000,cycle=0;return {tick(npcs){const time=now();if(time>=next+9000){next=time+25000+random()*10000;cycle++;}for(const [i,[key,character,text]]of LINES.entries()){const npc=npcs.find(n=>n.drinkingScene===key);if(!npc)continue;const start=next+i*2000;npc.utterance=time>=start&&time<start+6000?{id:`drinking:${cycle}:${next}:${i}`,character,text}:null;}},reset(){next=now()+25000+random()*10000;cycle++;}};}
module.exports={TABLE,LINES,nearby,createDrinkingDialogue};
