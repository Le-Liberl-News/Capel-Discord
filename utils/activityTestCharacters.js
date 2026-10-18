const TEST_CHARACTER_EXPIRY=null; // Capel selection stays available independently of the daily Discord draw.
function createTestCharacters({characters,now=Date.now,expires=TEST_CHARACTER_EXPIRY,permanent=[]}) {
 const choices=new Map(),names=Object.keys(characters);
 const active=()=>expires==null||now()<expires;
 const available=()=>active()?names:permanent.filter(n=>names.includes(n));
 return {menu(user){const characters=available();return characters.length?{characters,selected:characters.includes(choices.get(user))?choices.get(user):'',expires:active()?expires:null}:null;},set(user,name){const names=available();if(!names.length){const e=new Error('Les tests de personnage sont terminés.');e.status=403;throw e;}if(typeof name!=='string'||(name&&!names.includes(name))){const e=new Error('Personnage indisponible.');e.status=400;throw e;}if(name)choices.set(user,name);else choices.delete(user);},async resolve(user,original){return available().includes(choices.get(user))?choices.get(user):original(user);}};
}
module.exports={createTestCharacters,TEST_CHARACTER_EXPIRY};
