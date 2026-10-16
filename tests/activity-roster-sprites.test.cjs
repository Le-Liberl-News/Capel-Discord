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
 for(const name of ['Ein Selnate','Jack','Halle'])assert.equal(catalogue[name].directions,1,name);
 for(const name of ['Jack','Halle'])assert.equal(catalogue[name].source.kind,'illustration',name);
 assert.equal(catalogue['Rufina Argent'].source.chip,'ch03940');
});
