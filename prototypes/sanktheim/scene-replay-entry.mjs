import {startSiege} from './arena-front.mjs';
import playback from './scene-playback.cjs';
import {createCatalogue} from './catalogue.cjs';
const navigation=()=>({origin:{x:-65,z:-50},step:1,width:160,height:120,cells:Array(19200).fill(0),spawn:{x:0,y:0,z:0}});
import * as T from 'three';
let clip,current,controller;
const ghost={id:'recording-observer',character:'Julia',name:'',x:10000,y:0,z:10000,hp:500,maxHP:500,maxHp:500,online:true};
const recording={camera:null,async api(route){
 if(route==='session')return {player:ghost,notice:''};
 if(route==='catalogue'){const characters=new Map();for(const f of clip.frames)for(const a of [...f.state.players,...f.state.enemies])characters.set(a.pomCharacter??a.character,{character:a.pomCharacter??a.character});return createCatalogue(()=>[...characters.values()])();}
 if(route.startsWith('navigation'))return navigation(current.state,false,null,2/3);
 if(route==='music')return {};
 if(route==='state')return {...current.state,players:[...current.state.players,ghost]};
 if(route==='arena')return {siege:{...current.state,players:[...current.state.players,ghost]},player:ghost,position:ghost,movementSequence:0,combat:current.combat,messages:[],health:{...ghost,spectator:true,serverTime:current.state.at,canMove:false,cooldowns:{}}};
 throw Error('Read-only recording: unsupported route '+route);
}};
let pending=0;T.DefaultLoadingManager.onStart=()=>pending++;T.DefaultLoadingManager.onLoad=()=>pending=0;
window.loadSceneReplay=async job=>{
 clip=job;current=playback.sample(clip,clip.start);controller=await startSiege({recording});
 const style=document.createElement('style');style.textContent='html,body{margin:0!important;width:100%;height:100%;overflow:hidden}body.siege-mode>:not(#scene):not(#sky-labels){display:none!important}#scene,#sky-labels{display:block!important}#sky-labels .sky-nameplate{font-size:11px!important}';document.head.append(style);
 for(let i=0;i<3;i++){await controller.frame(playback.camera(clip,clip.start));await new Promise(r=>setTimeout(r,150));}
 await document.fonts.ready;
 let stable=0;while(stable<4){await new Promise(r=>setTimeout(r,100));if(pending)stable=0;else stable++;}
 window.sceneReplayReady=true;
};
window.drawSceneReplay=async at=>{current=playback.sample(clip,at);await controller.frame(playback.camera(clip,at));return {calls:controller.game.renderInfo?.().calls??0};};
