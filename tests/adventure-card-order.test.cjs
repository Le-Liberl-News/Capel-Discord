const test=require('node:test'),assert=require('node:assert/strict');
const {createAdventure}=require('../utils/adventure/engine');const {valuesOf,renderAnimation}=require('../utils/adventure/animations');
const permutations=list=>list.length?list.flatMap((value,i)=>permutations(list.filter((_,j)=>i!==j)).map(tail=>[value,...tail])):[[]];
test('synonymous card combinations match the same action but retain every typed order',()=>{
 const orders=permutations([100,20,13,1]),aliases=orders.flatMap(order=>[100,0,'excuse','banjo'].map(alias=>order.map(v=>v===100?alias:v).join('-')));
 const game=createAdventure({start:1,rooms:[{id:1,description:'Table.'}],nouns:{'0-20-13-1':aliases},actions:[{place:[1],verb:'distribuer',noun:['0-20-13-1'],text:'Même règle.',animation:'cartes'}]});
 for(const typed of aliases){const result=game.handle(game.fresh(),'distribuer '+typed);assert.equal(result.replies[0],'Même règle.');const expected=typed.split('-').map(v=>['0','100','excuse','banjo'].includes(v)?100:Number(v));assert.deepEqual(valuesOf(result.animation.words),expected,typed);}
});
test('different orders in the real adventure produce different GIFs, Excuse aliases retain the same GIF',async()=>{
 const data=require('../rpg/data/aventure.json'),game=createAdventure(data),state=game.fresh();state.room='4';
 const draw=async text=>{const result=game.handle(structuredClone(state),'distribuer '+text);assert.ok(result.animation,text);return (await renderAnimation(result.animation.name,result.animation.words)).attachment;};
 const a=await draw('100-20-13-1'),b=await draw('20-100-13-1'),alias=await draw('excuse-20-13-1');assert.ok(!a.equals(b),'Order changes the rendered GIF');assert.ok(a.equals(alias),'Only the Excuse name alias is equivalent');
});
