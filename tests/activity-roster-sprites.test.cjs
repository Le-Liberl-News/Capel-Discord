const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {characterNames}=require('../utils/characters'),catalogue=require('../activity/assets/sky/characters.json');
test('every character assignable in chat has its own existing sprite asset',()=>{
 for(const name of characterNames){
  const info=catalogue[name];assert.ok(info,`${name}: missing sprite`);
  assert.ok(name==='Estelle'||info.texture!==catalogue.Estelle.texture,`${name}: Estelle substitution`);
  assert.ok(fs.existsSync(path.join(__dirname,'../activity/assets/sky',info.texture)),`${name}: missing texture`);
  assert.ok(info.frames>0&&info.directions>0&&info.run.length>0,`${name}: empty animation`);
  assert.ok(info.run.every(p=>p*info.directions+info.directions<=info.frames),`${name}: invalid walking frames`);
 }
});
test('limited cutscene sources do not invent walking directions',()=>{
 assert.equal(catalogue['Ein Selnate'].directions,1);
 assert.equal(catalogue['Rufina Argent'].source.chip,'ch03940');
});

test('Jack and Halle have twelve walking poses in all eight directions',()=>{
 for(const name of ['Jack','Halle']){
  const info=catalogue[name];
  assert.equal(info.directions,8,name);
  assert.equal(info.run.length,12,name);
  assert.equal(info.source.generatedWithAI,false,name);
  const png=fs.readFileSync(path.join(__dirname,'../activity/assets/sky',info.texture));
  assert.equal(png.readUInt32BE(16),info.columns*info.frameWidth,name);
  assert.equal(png.readUInt32BE(20),info.rows*info.frameHeight,name);
 }
});
