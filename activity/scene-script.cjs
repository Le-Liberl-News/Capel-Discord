// Small declarative scene language. No code evaluation or external commands.
function compileScene(source){
 let at=0,end=0,map='halloween';const events=[],actors=[],assets=[];
 const number=(value,line)=>{const n=Number(value);if(!Number.isFinite(n))throw Error(`Scène ligne ${line}: nombre invalide`);return n;};
 const seconds=(value,line)=>{const n=number(value,line);if(n<0||n>600)throw Error(`Scène ligne ${line}: durée invalide`);return n*1000;};
 source.split(/\r?\n/).forEach((raw,i)=>{
  const line=i+1,text=raw.trim();if(!text||text.startsWith('#'))return;
  const tokens=text.match(/"(?:[^"\\]|\\.)*"|\S+/g)||[],values=tokens.map(t=>t.startsWith('"')?JSON.parse(t):t),[command,...args]=values;
  const expect=n=>{if(args.length!==n)throw Error(`Scène ligne ${line}: ${command} attend ${n} arguments`);};
  if(command==='map'){expect(1);if(!/^[a-z0-9_-]+$/.test(args[0]))throw Error(`Scène ligne ${line}: map invalide`);map=args[0];return;}
  if(command==='actor'){expect(6);if(!/^[a-z][a-z0-9_-]*$/i.test(args[0])||actors.some(a=>a.name===args[0]))throw Error(`Scène ligne ${line}: acteur invalide ou doublon`);if((args[0]==='player')!==(args[5]==='player'))throw Error(`Scène ligne ${line}: le joueur doit porter le nom player`);if(!['npc','enemy','player'].includes(args[5]))throw Error(`Scène ligne ${line}: rôle invalide`);actors.push({name:args[0],character:args[1],position:{x:number(args[2],line),y:number(args[3],line),z:number(args[4],line)},kind:args[5]});return;}
  if(command==='asset'){expect(3);if(!['model','effect','sound'].includes(args[1])||assets.some(a=>a.id===args[0]))throw Error(`Scène ligne ${line}: asset invalide`);assets.push({id:args[0],kind:args[1],source:args[2]});return;}
  let e={type:command,at,line};
  if(command==='spawn'||command==='effect'){expect(command==='spawn'?7:8);Object.assign(e,{id:args[0],asset:args[1],position:{x:number(args[2],line),y:number(args[3],line),z:number(args[4],line)},yaw:number(args[5],line)*Math.PI/180,scale:number(args[6],line)});if(e.scale<=0)throw Error(`Scène ligne ${line}: échelle invalide`);if(command==='effect')e.duration=seconds(args[7],line);}
  else if(command==='remove'){expect(1);e.id=args[0];}
  else if(command==='sound'){expect(2);e.asset=args[0];e.volume=number(args[1],line);if(e.volume<0||e.volume>1)throw Error(`Scène ligne ${line}: volume entre 0 et 1`);}
  else if(command==='curve'){expect(11);Object.assign(e,{actor:args[0],from:{x:number(args[1],line),y:number(args[2],line),z:number(args[3],line)},control:{x:number(args[4],line),y:number(args[5],line),z:number(args[6],line)},to:{x:number(args[7],line),y:number(args[8],line),z:number(args[9],line)},duration:seconds(args[10],line)});}
  else
  if(command==='wait'){expect(1);at+=seconds(args[0],line);end=Math.max(end,at);return;}
  else if(command==='say'){expect(2);Object.assign(e,{actor:args[0],text:args[1]});}
  else if(command==='title'){expect(2);Object.assign(e,{text:args[0],duration:seconds(args[1],line)});}
  else if(command==='fade'){expect(3);if(!['in','out'].includes(args[0]))throw Error(`Scène ligne ${line}: fondu in ou out`);Object.assign(e,{direction:args[0],duration:seconds(args[1],line),hold:seconds(args[2],line)});}
  else if(command==='walk'){expect(8);Object.assign(e,{actor:args[0],from:{x:number(args[1],line),y:number(args[2],line),z:number(args[3],line)},to:{x:number(args[4],line),y:number(args[5],line),z:number(args[6],line)},duration:seconds(args[7],line)});}
  else if(command==='face'){expect(3);Object.assign(e,{actor:args[0],dx:number(args[1],line),dz:number(args[2],line)});}
  else if(command==='camera'){if(![7,8].includes(args.length))expect(7);Object.assign(e,{transition:args[7]??'tween',focus:{x:number(args[0],line),y:number(args[1],line),z:number(args[2],line)},yaw:number(args[3],line)*Math.PI/180,pitch:number(args[4],line)*Math.PI/180,distance:number(args[5],line),duration:seconds(args[6],line)});if(!['cut','fade','tween'].includes(e.transition))throw Error(`Scène ligne ${line}: transition invalide`);if(e.distance<=0)throw Error(`Scène ligne ${line}: distance caméra invalide`);}
  else throw Error(`Scène ligne ${line}: commande inconnue ${command}`);
  if(e.actor&&!/^[a-z][a-z0-9_-]*$/i.test(e.actor))throw Error(`Scène ligne ${line}: acteur invalide`);
  events.push(e);end=Math.max(end,at+(e.duration||0)+(e.hold||0));
 });
 for(const e of events)if(e.actor&&actors.length&&!actors.some(a=>a.name===e.actor))throw Error(`Scène ligne ${e.line}: acteur inconnu ${e.actor}`);
 if((!events.length&&!actors.length)||end>600000)throw Error('Scène vide ou trop longue');for(const e of events)if(e.asset&&!assets.some(a=>a.id===e.asset&&a.kind===(e.type==='spawn'?'model':e.type==='effect'?'effect':'sound')))throw Error(`Scène ligne ${e.line}: asset inconnu ou mauvais type ${e.asset}`);return {events,duration:end,map,actors,assets};
}
function walkAt(definition,actor,elapsed){
 const event=definition.events.filter(e=>['walk','curve'].includes(e.type)&&e.actor===actor&&elapsed>=e.at).at(-1);if(!event)return null;
 const t=Math.min(1,Math.max(0,(elapsed-event.at)/(event.duration||1))),position={};for(const k of ['x','y','z'])position[k]=event.control?(1-t)**2*event.from[k]+2*(1-t)*t*event.control[k]+t*t*event.to[k]:event.from[k]+(event.to[k]-event.from[k])*t;
 const heading={};for(const [k,h]of [['x','dx'],['z','dz']])heading[h]=event.control?2*((1-t)*(event.control[k]-event.from[k])+t*(event.to[k]-event.control[k])):event.to[k]-event.from[k];return {position,moving:t<1,heading};
}
function createSceneClock(definition){
 let time=0,last=null,index=0,waiting=false,done=false;
 return {tick(wall,emit){if(done)return time;const delta=last===null?0:Math.max(0,wall-last);last=wall;if(waiting)return time;time=Math.min(definition.duration,time+delta);
  while(index<definition.events.length&&definition.events[index].at<=time){const event=definition.events[index++];if(event.type==='say'){time=event.at;waiting=true;emit(event,index);break;}}
  done=!waiting&&index>=definition.events.length&&time>=definition.duration;return time;
 },advance(){if(waiting)waiting=false;},state(){return {time,waiting,done,index};}};
}
module.exports={compileScene,walkAt,createSceneClock};
