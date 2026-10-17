export function createYellowTracerTexture(THREE){
 const canvas=document.createElement('canvas');canvas.width=8;canvas.height=64;const ctx=canvas.getContext('2d');
 const glow=ctx.createLinearGradient(0,0,0,64);glow.addColorStop(0,'rgba(255,210,24,0)');glow.addColorStop(.12,'#ffd218');glow.addColorStop(.7,'#ffe43b');glow.addColorStop(1,'#fff398');ctx.fillStyle=glow;ctx.fillRect(2,0,4,64);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=texture.minFilter=THREE.LinearFilter;return texture;
}
