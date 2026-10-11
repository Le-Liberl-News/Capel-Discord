const TEST_CHARACTER_EXPIRY=Date.parse('2026-10-18T07:30:00Z'); // temporary tests until 18 October, 09:30 Paris
function createTestCharacters({characters,now=Date.now,expires=TEST_CHARACTER_EXPIRY}) {
 const choices=new Map(),names=Object.keys(characters);
 const enabled=()=>now()<expires;
 return {menu(user){return enabled()?{characters:names,selected:choices.get(user)??'',expires}:null;},set(user,name){if(!enabled()){const e=new Error('Les tests de personnage sont terminés.');e.status=403;throw e;}if(typeof name!=='string'||(name&&!names.includes(name))){const e=new Error('Personnage indisponible.');e.status=400;throw e;}if(name)choices.set(user,name);else choices.delete(user);},async resolve(user,original){return enabled()&&choices.has(user)?choices.get(user):original(user);}};
}
module.exports={createTestCharacters,TEST_CHARACTER_EXPIRY};
