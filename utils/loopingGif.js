// Emergency memory safeguard: panels keep a single still canvas.
// Retain the shared API; callers now attach the returned bytes as PNG.
async function encodeLoop(base,_options){
 return base.toBuffer('image/png');
}
module.exports={encodeLoop};
