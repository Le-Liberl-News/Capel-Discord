const {combatSpec}=require('./native-combat.cjs');
const COMMON=['sc/mp067_02._ef','sc/ms10011._ef','third/sc040_09._ef','third/sc040_07._ef'];
const EXTRAS={Nial:['sc/mp050_00._ef'],Phyllis:['sc/mp050_00._ef','sc/ms30000d._ef'],Mueller:['sc/cr130_02._ef','third/sc006_17._ef'],Pat:['third/ms04671l._ef'],Anton:['third/sc001_12._ef'],Richard:['third/sc270_12._ef'],Olivier:['third/sc003_17._ef'],Campanella:['sc/sc480_03._ef','sc/mg022_0._ef'],Renne:['sc/cr153_00._ef','third/btbomb00._ef'],Bleublanc:['sc/cr153_00._ef','third/btbomb00._ef']};
function characterEffects(character){const ids=new Set(COMMON);function visit(value){if(typeof value==='string'&&value.toLowerCase().endsWith('._ef'))ids.add(value.toLowerCase());else if(value&&typeof value==='object')for(const v of Object.values(value))visit(v);}for(const kind of ['basic','craft','art'])visit(combatSpec(character,kind));for(const id of EXTRAS[character]??[])ids.add(id);return ids;}
module.exports={characterEffects};
