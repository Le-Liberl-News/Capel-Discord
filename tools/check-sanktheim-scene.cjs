// Local read-only render: no Discord client, authentication, or live siege state.
const fs=require('node:fs'),path=require('node:path');
const {createSiege,civil}=require('../prototypes/sanktheim/core.cjs'),{createSceneHistory}=require('../prototypes/sanktheim/scene-history.cjs');
async function fixture(){
 const start=civil('2026-10-22',14),siege=createSiege({now:()=>start,cohort:()=>[{character:'Renne',stage:3,kind:'funebre'}]});siege.start();siege.testWave();siege.advance(start+300);const base=siege._state.at;
 const p=siege.join('player-preview','Julia','Julia');Object.assign(p,{x:-36,y:0,z:3});const e=siege._state.enemies[0];Object.assign(e,{x:-55,y:0,z:6,moving:false});
 const position={x:-34.2,y:3,z:6},wall=siege._state.walls[1],shell={id:'preview-shell',from:e.id,wall:wall.id,at:base,points:require('../prototypes/sanktheim/catapult.cjs').path({x:e.x,y:2,z:e.z},position)};siege._state.shells.push(shell);
 const history=createSceneHistory({siege,now:()=>base+10000});let event;
 for(let t=0;t<=3500;t+=100){siege._state.at=base+t;if(t===1900){shell.done=true;siege._damageWall(wall,wall.maxHP*.06,{from:e.id,kind:'shell',position,projectile:shell});event=siege.outbox().find(e=>e.type==='threshold');}history.record();}
 return history.clip(event);
}
async function main(){const renderer=require('../prototypes/sanktheim/scene-renderer.cjs');try{const clip=await fixture();if(!process.argv.includes('--full'))clip.end=clip.start+200;const output=path.resolve(__dirname,'../.runtime/scene-review');fs.mkdirSync(output,{recursive:true});const result=await renderer.renderScene(clip,{onFrame:(png,at)=>fs.writeFileSync(path.join(output,at+'.png'),png)});if(result.attachment.subarray(0,3).toString()!=='GIF')throw Error('Invalid scene GIF');fs.writeFileSync(path.join(output,'scene.gif'),result.attachment);console.log('Native scene replay OK:',result.attachment.length,'bytes');}finally{await renderer.close();}}
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1;});module.exports={fixture};
