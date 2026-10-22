const POSTS=[{x:-39,y:.04,z:-6},{x:-39,y:.04,z:6}];
function createPeaceWatch({state,transit,restingPolicy}){
 state.peaceWatch??={ids:[],round:0};
 function ensure({rotate=false,immediate=false}={}){
  if(state.wave||state.stoppedAt)return;
  const watch=state.peaceWatch,previous=new Set(watch.ids),alive=state.soldiers.filter(s=>s.hp>0);
  const picked=rotate?[]:watch.ids.map(id=>alive.find(s=>s.id===id)).filter(Boolean).slice(0,2);
  const candidates=alive.filter(s=>!picked.includes(s)).sort((a,b)=>(rotate?Number(previous.has(a.id))-Number(previous.has(b.id)):0)||(a.watchShifts??0)-(b.watchShifts??0)||a.id.localeCompare(b.id));
  while(picked.length<2&&candidates.length)picked.push(candidates.shift());
  const ids=new Set(picked.map(s=>s.id));if(rotate)watch.round++;
  for(const s of alive)if(s.role==='sentry'&&!ids.has(s.id)){s.role='waiting';s.sleeping=false;transit(s,s.restPosition);}
  for(const [i,s]of picked.entries()){
   const assigned=s.role==='sentry'&&previous.has(s.id)&&!rotate;
   if(!assigned){s.watchShifts=(s.watchShifts??0)+1;s.role='sentry';s.sleeping=false;s.wingZ=POSTS[i].z;s.watchPosition={...POSTS[i]};if(immediate){Object.assign(s,POSTS[i]);s.transit=null;}else transit(s,POSTS[i]);}
   s.sleeping=false;
  }
  watch.ids=picked.map(s=>s.id);restingPolicy();
 }
 return {ensure};
}
module.exports={createPeaceWatch,POSTS};
