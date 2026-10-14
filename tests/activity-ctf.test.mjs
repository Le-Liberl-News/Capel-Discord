import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import mechanics from '../activity/ctf-mechanics.cjs';
import {createCaptureTheFlag,ctfOpponents} from '../activity/ctf.mjs';
const require=createRequire(import.meta.url);
const {CTF,createFlag,tickFlag}=mechanics;

test('walking onto the flag picks it up; the carrier scores time for the team and drops it on death',()=>{
 const red={id:'r',team:'red',x:5,y:0,z:0,hp:500},blue={id:'b',team:'blue',x:-5,y:0,z:0,hp:500},players=new Map([['r',red],['b',blue]]);
 const flag=createFlag({x:0,y:0,z:0},0);tickFlag(flag,players,100);assert.equal(flag.holder,null);
 red.x=.6;tickFlag(flag,players,200);assert.equal(flag.holder,'r');
 red.x=3;tickFlag(flag,players,1200);assert.equal(flag.score.red,1000);assert.equal(flag.x,3,'the flag follows its carrier');
 red.hp=0;tickFlag(flag,players,1300);assert.equal(flag.holder,null);assert.equal(flag.x,3,'dropped where the carrier fell');
 blue.x=3.4;tickFlag(flag,players,1400);assert.equal(flag.holder,'b');
 tickFlag(flag,players,CTF.duration+10);assert.equal(flag.finished.winner,'blue');
});

test('a five-minute match on the Grancel arena: the AIs fight over the flag, die, come back and a team wins',()=>{
 const {createActivityGeometry}=require('../utils/activityGeometry.js');
 const grid=JSON.parse(fs.readFileSync('activity/assets/sky/arena/navigation.json')),geometry=createActivityGeometry(JSON.parse(fs.readFileSync('activity/assets/sky/arena/anterose.gltf','utf8')));
 const catalogue=Object.fromEntries(Object.keys(require('../activity/native-combat.cjs').COMBAT).map(n=>[n,true]));
 let clock=1000,seed=7;const random=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const venue={red:{x:-1,z:3.25},blue:{x:-1,z:-16.25},centre:{x:-1,z:-6.5}};
 const game=createCaptureTheFlag({grid,geometry,character:'Estelle',team:'red',venue,candidates:ctfOpponents(catalogue),now:()=>clock,random});
 let result,carried=new Set(),respawned=0;
 for(;clock<1000+CTF.duration+500;clock+=50){
  result=game.tick({x:game.player.x,y:game.player.y,z:game.player.z},null);
  if(result.ctf.holder)carried.add(result.ctf.holder);
  if(result.finish)break;
 }
 for(const p of game.players.values())respawned+=p.respawn??0;
 assert.ok(result.finish,'the match ends after five minutes');
 assert.ok(carried.size>=2,`the flag changed hands (${[...carried].join(', ')})`);
 assert.ok(respawned>0,'fallen fighters came back');
 assert.ok(result.ctf.score.red+result.ctf.score.blue>60000,'the flag was held for a good part of the match');
});
