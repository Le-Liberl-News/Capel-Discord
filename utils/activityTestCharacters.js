const TEST_CHARACTER_EXPIRY=Date.parse('2026-10-18T07:30:00Z'); // temporary tests until 18 October, 09:30 Paris
function createTestCharacters({characters,now=Date.now,expires=TEST_CHARACTER_EXPIRY,permanent=[]}) {
 const choices=new Map(),names=Object.keys(characters);
 const available=()=>now()<expires?names:permanent.filter(n=>names.includes(n));
 return {menu(user){const characters=available();return characters.length?{characters,selected:characters.includes(choices.get(user))?choices.get(user):'',expires:now()<expires?expires:null}:null;},set(user,name){const names=available();if(!names.length){const e=new Error('Les tests de personnage sont terminés.');e.status=403;throw e;}if(typeof name!=='string'||(name&&!names.includes(name))){const e=new Error('Personnage indisponible.');e.status=400;throw e;}if(name)choices.set(user,name);else choices.delete(user);},async resolve(user,original){return available().includes(choices.get(user))?choices.get(user):original(user);}};
}
module.exports={createTestCharacters,TEST_CHARACTER_EXPIRY};
