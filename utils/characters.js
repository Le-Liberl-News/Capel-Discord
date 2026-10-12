const characters=require('../rpg/data/persos.json');
function characterRegistry(data=characters){const names=Object.keys(data).filter(name=>name!=='default').sort((a,b)=>(data[a].anonymeIndex??Infinity)-(data[b].anonymeIndex??Infinity));return {names,combos:names.map((name,index)=>{const paired=names.indexOf(data[name].combo);return paired<0?index:paired;}),title:name=>String(data[name]?.titre||'Titre à renseigner')};}
const registry=characterRegistry();module.exports={characterRegistry,characterNames:registry.names,characterCombos:registry.combos,characterTitle:registry.title};
