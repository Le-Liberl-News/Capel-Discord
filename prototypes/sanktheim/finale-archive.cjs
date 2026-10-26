// The finale kept for its cinematic (mechapom.cjs reaches the walls during the wave core.cjs's FINALE names): from a
// minute and a half before the planned arrival to five minutes after the real one, the whole scene every few seconds,
// as the server holds it (in the map's units), with the wave's scores (its MVP) and who took part. One file per moment, read back
// one at a time (the site's relay has a timeout).
const fs=require('node:fs'),path=require('node:path');
const BEFORE=90000,AFTER=300000,EVERY=3000;
function createFinaleArchive({siege,dir}){
 let next=0,list=null;
 const index=()=>list??=fs.existsSync(dir)?fs.readdirSync(dir).filter(n=>/^\d+\.json$/.test(n)).sort((a,b)=>parseInt(a)-parseInt(b)):[];
 function record(){
  const st=siege._state,finale=st.finale,f=st.mechapom,t=st.at;
  if(!finale||!st.wave||t<next||t<finale.arrival-BEFORE||t>(f?.arrivedAt??Infinity)+AFTER)return;
  next=t+EVERY;fs.mkdirSync(dir,{recursive:true});
  const wave=st.wave,moment={at:t,arrival:finale.arrival,arrivedAt:f?.arrivedAt??null,stats:wave.stats??{},participants:wave.participants??{},view:siege.snapshot()};
  fs.writeFileSync(path.join(dir,t+'.json'),JSON.stringify(moment));index().push(t+'.json');
 }
 // the list of moments, or one of them by its place in the list
 function read(i){const names=index();if(!Number.isInteger(i)||i<0)return {moments:names.map(n=>parseInt(n))};const name=names[i];return name?JSON.parse(fs.readFileSync(path.join(dir,name),'utf8')):null;}
 return {record,read};
}
module.exports={createFinaleArchive};
