// This director only renders the private lab scene; it never publishes chat.
export function createHalloweenScene({definition,onSpeech}) {
 let started=null,cursor=0;
 return {
  start(time){if(started===null)started=time;},
  active(time){return started!==null&&time-started<definition.duration;},
  update(time,avatars,localId,camera,follow){
   if(started===null||time-started>=definition.duration)return;
   const ray=avatars.get('npc:halloween-ray'),patient=avatars.get('npc:halloween-pumpkin'),player=avatars.get(localId);if(!ray||!patient||!player)return;
   const elapsed=time-started;
   while(cursor<definition.lines.length&&elapsed>=definition.lines[cursor].at){const line=definition.lines[cursor++],pumpkin=line.speaker==='pumpkin';onSpeech({id:'halloween:'+started+':'+cursor,author:pumpkin?'npc:halloween-pumpkin':'npc:halloween-ray',character:pumpkin?'Pom-tiron':'Ray',text:line.text});}
   player.heading={dx:0,dz:1};ray.heading=elapsed<7000?{dx:0,dz:-1}:{dx:2,dz:.5};
   const focus=elapsed<7000?{x:0,y:.8,z:4}:{x:.9,y:.7,z:5},angle=.65+Math.sin(elapsed/18000)*.1;
   follow.set(focus.x,focus.y,focus.z);camera.position.set(focus.x+Math.sin(angle)*12,focus.y+9,focus.z-Math.cos(angle)*12);camera.lookAt(focus.x,focus.y,focus.z);
  }
 };
}
