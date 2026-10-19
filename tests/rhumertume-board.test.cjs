const test=require('node:test'),assert=require('node:assert/strict');
const {createRhumertumeBoard}=require('../utils/rhumertumeBoard');
const MINUTE=60000;
function setup(){
 const levels={Estelle:0,Joshua:2,Tita:1},sent=[],edited=[];let now=Date.parse('2026-10-24T18:00:00Z'),saved=null,exists=true;
 const message={id:'m1',edit:async m=>edited.push(m)};
 const channel={send:async m=>{sent.push(m);return message;},messages:{fetch:async id=>{if(!exists){const e=Error('Unknown Message');e.code=10008;throw e;}return {...message,id};}}};
 const rhumertume={level:c=>levels[c],nameOf:c=>['','Pom','Pompom'][levels[c]]+c,since:c=>levels[c]?now-levels[c]*3600000:null};
 const renders=[];
 const board=createRhumertumeBoard({client:{channels:{fetch:async()=>channel}},channelId:'c',store:{load:()=>saved,save:s=>{saved=JSON.parse(JSON.stringify(s));}},
  rhumertume,characterNames:Object.keys(levels),now:()=>now,render:async rows=>{renders.push(rows);return {attachment:Buffer.from('png'),name:'rhumertume.png'};}});
 return {board,levels,sent,edited,renders,later:m=>{now+=m*MINUTE;},lose:()=>{exists=false;}};
}
test('the board lists everyone, the most advanced first, and keeps one message up to date',async()=>{
 const {board,levels,sent,edited,renders,later,lose}=setup();
 assert.equal(await board.refresh(),true);assert.equal(sent.length,1);
 assert.deepEqual(renders[0].map(r=>[r.name,r.level]),[['PompomJoshua',2],['PomTita',1],['Estelle',0]]);
 assert.equal(await board.refresh(),false);                          // nothing changed
 levels.Estelle=1;assert.equal(await board.refresh(),true);assert.equal(edited.length,1);assert.equal(sent.length,1);
 later(10);assert.equal(await board.refresh(),true);assert.equal(edited.length,2);   // the "since" times move on
 lose();later(10);await board.refresh();assert.equal(sent.length,2);                  // deleted: posted again
});