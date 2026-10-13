// Small declarative scene language. No code evaluation or external commands.
function compileScene(source){
 let at=0,end=0;const events=[];
 const number=(value,line)=>{const n=Number(value);if(!Number.isFinite(n))throw Error(`Scène ligne ${line}: nombre invalide`);return n;};
 const seconds=(value,line)=>{const n=number(value,line);if(n<0||n>600)throw Error(`Scène ligne ${line}: durée invalide`);return n*1000;};
 source.split(/\r?\n/).forEach((raw,i)=>{
  const line=i+1,text=raw.trim();if(!text||text.startsWith('#'))return;
  const tokens=text.match(/"(?:[^"\\]|\\.)*"|\S+/g)||[],values=tokens.map(t=>t.startsWith('"')?JSON.parse(t):t),[command,...args]=values;
  const expect=n=>{if(args.length!==n)throw Error(`Scène ligne ${line}: ${command} attend ${n} arguments`);};
  let e={type:command,at};
  if(command==='wait'){expect(1);at+=seconds(args[0],line);end=Math.max(end,at);return;}
  if(command==='say'){expect(2);Object.assign(e,{actor:args[0],text:args[1]});}
  else if(command==='title'){expect(2);Object.assign(e,{text:args[0],duration:seconds(args[1],line)});}
  else if(command==='fade'){expect(3);if(!['in','out'].includes(args[0]))throw Error(`Scène ligne ${line}: fondu in ou out`);Object.assign(e,{direction:args[0],duration:seconds(args[1],line),hold:seconds(args[2],line)});}
  else if(command==='walk'){expect(8);Object.assign(e,{actor:args[0],from:{x:number(args[1],line),y:number(args[2],line),z:number(args[3],line)},to:{x:number(args[4],line),y:number(args[5],line),z:number(args[6],line)},duration:seconds(args[7],line)});}
  else if(command==='face'){expect(3);Object.assign(e,{actor:args[0],dx:number(args[1],line),dz:number(args[2],line)});}
  else if(command==='camera'){expect(7);Object.assign(e,{focus:{x:number(args[0],line),y:number(args[1],line),z:number(args[2],line)},yaw:number(args[3],line)*Math.PI/180,pitch:number(args[4],line)*Math.PI/180,distance:number(args[5],line),duration:seconds(args[6],line)});if(e.distance<=0)throw Error(`Scène ligne ${line}: distance caméra invalide`);}
  else throw Error(`Scène ligne ${line}: commande inconnue ${command}`);
  if(e.actor&&!/^[a-z][a-z0-9_-]*$/i.test(e.actor))throw Error(`Scène ligne ${line}: acteur invalide`);
  events.push(e);end=Math.max(end,at+(e.duration||0)+(e.hold||0));
 });
 if(!events.length||end>600000)throw Error('Scène vide ou trop longue');return {events,duration:end};
}
function walkAt(definition,actor,elapsed){
 const event=definition.events.filter(e=>e.type==='walk'&&e.actor===actor&&elapsed>=e.at).at(-1);if(!event)return null;
 const t=Math.min(1,Math.max(0,(elapsed-event.at)/(event.duration||1))),position={};for(const k of ['x','y','z'])position[k]=event.from[k]+(event.to[k]-event.from[k])*t;
 return {position,moving:t<1,heading:{dx:event.to.x-event.from.x,dz:event.to.z-event.from.z}};
}
module.exports={compileScene,walkAt};
