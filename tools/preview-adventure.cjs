// Isolated loopback preview: same Discord adapter/engine, separate durable saves, no real Discord calls.
const path=require('node:path'),express=require('express');
const {createAdventureDiscord}=require('../utils/adventure/discord');
const {createStateStore}=require('../utils/stateStore');
const {createLineArchive}=require('../utils/adventure/lineArchive');
const send=async()=>({id:'preview'}),client={users:{fetch:async()=>({send})},channels:{fetch:async()=>({send})}};
const root=path.join(__dirname,'../.runtime/adventure-preview');
const adventure=createAdventureDiscord({client,data:require('../rpg/data/aventure.json'),store:createStateStore(path.join(root,'state.json')),archive:createLineArchive(path.join(root,'archive')),channelId:null,shareWait:0});
const app=express();app.use(express.json({limit:'16kb'}));
require('../utils/adventure/web').registerAdventureWeb({app,adventure,authenticate:async req=>{
 const id=String(req.headers['x-adventure-test-id']||'900000000000000001');if(!/^9\d{17}$/.test(id))throw Object.assign(Error('Identité de test invalide.'),{status:401});return {id,name:'Voyageur de test'};
}});
app.listen(Number(process.env.ADVENTURE_PREVIEW_PORT||3081),'127.0.0.1',()=>console.log('Adventure preview on http://127.0.0.1:3081 (isolated saves)'));
