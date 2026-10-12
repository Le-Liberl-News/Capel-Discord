const test=require('node:test'),assert=require('node:assert/strict');
test('Earth art atlas cells have transparent borders and filtering stays inside the selected frame',async()=>{
 const {loadImage,createCanvas}=require('@napi-rs/canvas'),THREE=await import('three'),{bakedEffectSprite}=await import('../activity/baked-effects.mjs');
 const image=await loadImage(require('node:path').join(__dirname,'../activity/assets/sky/effects/sc-mg017_0-frames.png')),canvas=createCanvas(image.width,image.height),ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);const rgba=ctx.getImageData(0,0,image.width,image.height).data;
 for(let frame=0;frame<90;frame++){const x=frame%8*128,y=Math.floor(frame/8)*128;for(let p=0;p<128;p++)for(const [a,b]of [[x+p,y],[x+p,y+127],[x,y+p],[x+127,y+p]])assert.equal(rgba[(b*image.width+a)*4+3],0);}
 const map=new THREE.Texture({width:image.width,height:image.height}),fx=bakedEffectSprite(THREE,{map,frames:90,columns:8,rows:12},4);fx.draw(0);assert.ok(fx.sprite.material.map.offset.x>0);assert.ok(fx.sprite.material.map.repeat.x<1/8);fx.dispose();map.dispose();
});
