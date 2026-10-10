function gifInfo(bytes,{maxBytes=3000000,maxFrames=24}={}) {
  if(!Buffer.isBuffer(bytes)||bytes.length>maxBytes||bytes.length<14||!['GIF87a','GIF89a'].includes(bytes.toString('ascii',0,6)))throw new Error('GIF invalide.');
  const width=bytes.readUInt16LE(6),height=bytes.readUInt16LE(8);if(width<32||height<32||width>448||height>336)throw new Error('Dimensions GIF invalides.');
  let offset=13+(bytes[10]&128?3*(1<<((bytes[10]&7)+1)):0),frames=0;
  const blocks=()=>{for(;;){if(offset>=bytes.length)throw new Error('GIF tronqué.');const n=bytes[offset++];if(!n)break;offset+=n;if(offset>bytes.length)throw new Error('GIF tronqué.');}};
  while(offset<bytes.length){const type=bytes[offset++];if(type===59){if(offset!==bytes.length||frames<4||frames>maxFrames)throw new Error('Animation GIF invalide.');return {width,height,frames};}
    if(type===33){offset++;blocks();continue;}
    if(type!==44||offset+9>=bytes.length)throw new Error('GIF invalide.');
    const x=bytes.readUInt16LE(offset),y=bytes.readUInt16LE(offset+2),w=bytes.readUInt16LE(offset+4),h=bytes.readUInt16LE(offset+6),flags=bytes[offset+8];
    if(!w||!h||x+w>width||y+h>height||++frames>maxFrames)throw new Error('Images GIF invalides.');offset+=9;
    if(flags&128)offset+=3*(1<<((flags&7)+1));if(offset>=bytes.length||bytes[offset]<2||bytes[offset]>8)throw new Error('GIF invalide.');offset++;blocks();
  }throw new Error('GIF sans fin.');
}
function createActivityRoleplay({send,now=Date.now,onError=()=>{},setTimer=setTimeout,clearTimer=clearTimeout}) {
  const crafts=new Map(),speechIds=new Set();let tail=Promise.resolve();
  const publish=payload=>{const operation=tail.catch(()=>{}).then(()=>send(payload));tail=operation;return operation;};
  async function speech({id,character,text,match,map}) {
    if(speechIds.has(id))return;speechIds.add(id);if(speechIds.size>10000)speechIds.delete(speechIds.values().next().value);
    const letters=Array.from(text);for(let i=0;i<letters.length;i+=1800)await publish({character,match,map,text:letters.slice(i,i+1800).join('')});
  }
  function craft(event) {
    if(crafts.has(event.id))return;
    const record={...event,expires:now()+60000,published:false};crafts.set(event.id,record);
    record.timer=setTimer(()=>{if(!record.published&&!record.sending){record.sending=publish({character:record.character,match:record.match,text:record.character+' lance '+record.technique+'.'}).then(()=>{record.published=true;}).catch(onError).finally(()=>{record.sending=null;});}},30000);record.timer?.unref?.();
    for(const [id,r]of crafts)if(r.expires<now()){clearTimer(r.timer);crafts.delete(id);}
  }
  async function capture(user,body) {
    const record=crafts.get(body?.id);
    const fail=(message,status=400)=>{const e=new Error(message);e.status=status;throw e;};
    if(!record||(record.actors?!record.actors.includes(user):record.actor!==user)||record.expires<now())fail('Capture expirée ou inaccessible.',403);
    if(record.published)return {posted:true};
    const limits=record.actors?{maxBytes:8000000,maxFrames:96}:{maxBytes:3000000,maxFrames:24};
    if(typeof body.gif!=='string'||body.gif.length>Math.ceil(limits.maxBytes/3)*4||(body.gif.length%4!==0||!/^[A-Za-z0-9+/]*={0,2}$/.test(body.gif)))fail('GIF invalide.');
    const bytes=Buffer.from(body.gif,'base64');try{gifInfo(bytes,limits);}catch(e){fail(e.message);}
    if(!record.sending){clearTimer(record.timer);record.sending=publish({character:record.character,match:record.match,text:record.text??record.character+' lance '+record.technique+'.',gif:bytes,fileName:record.actors?"last-action.gif":undefined}).then(()=>{record.published=true;}).finally(()=>{record.sending=null;});}
    await record.sending;return {posted:true};
  }
  function finish(event){if(crafts.has(event.captureId))return;crafts.set(event.captureId,{actors:event.actors,character:event.winnerName,match:event.id,text:"Dernière action — ralenti.",expires:(event.at??now())+120000,published:false});for(const [id,r]of crafts)if(r.expires<now()){clearTimer(r.timer);crafts.delete(id);}}
  return {speech,craft,finish,capture,flush:()=>tail};
}
module.exports={createActivityRoleplay,gifInfo};
