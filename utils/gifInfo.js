// A GIF's checked dimensions and frame count (it throws on a malformed or oversized animation).
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
module.exports={gifInfo};
