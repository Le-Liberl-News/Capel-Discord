const TREES=[...require('./forest.json'),...require('./expansion.cjs').extraTrees,...require('./expansion.cjs').quarry];
const CUT_TIME=15000,REGROW_TIME=6*3600000;
const COSTS={auto:300,manual:300,barricade:30,mine:20};
const REACH=2.4;
function growth(tree,at){return tree.cutAt==null?4:Math.min(4,Math.floor(Math.max(0,at-tree.cutAt)/(REGROW_TIME/4)));}
function createForestry({state,emit,geometry=()=>null}){
 state.forestry??={wood:0,revision:0,trees:TREES.map(t=>({id:t.id,cutAt:null,work:0,worker:null}))};
 const forest=state.forestry;forest.stone??=0;for(const d of TREES)if(!forest.trees.some(t=>t.id===d.id))forest.trees.push({id:d.id,cutAt:null,work:0,worker:null});forest.at=state.at;const definitions=new Map(TREES.map(t=>[t.id,t])),trees=new Map(forest.trees.map(t=>[t.id,t]));
 function cancel(p){if(!p?.chopping)return;const t=trees.get(p.chopping);if(t?.worker===p.id)t.worker=null;p.chopping=null;}
 function valid(p,t){const d=definitions.get(t.id);return p?.online&&p.hp>0&&!p.pomControlled&&!p.cling&&!p.climb&&!p.jump&&!p.turretControl&&!p.mineLaunch&&state.at>=(p.combatLockedUntil??0)&&state.at>=(p.stunUntil??0)&&Math.abs(p.y-d.y)<1.6&&Math.hypot(p.x-d.x,p.z-d.z)<=REACH&&state.at-p.lastSeen<=8000;}
 function action(id,a,scale=1){const raw=state.players[id];if(a.kind==='cancel'){cancel(raw);return {ok:true};}const d=definitions.get(a.tree),t=trees.get(a.tree);if(!t||a.kind!=='chop')return {error:'Arbre introuvable.'};const p=raw&&{...raw,x:raw.x/scale,y:raw.y/scale,z:raw.z/scale};if(!valid(p,t))return {error:p?.pomControlled?'Les poms ne peuvent pas bûcher.':'Approchez de l’arbre, à pied et hors attaque.'};if(growth(t,state.at)<4)return {error:'Cet arbre est encore en train de repousser.'};if(t.worker&&t.worker!==id)return {error:'Un autre défenseur coupe déjà cet arbre.'};
 // A building, cliff or wall between the actor and the trunk must block interaction.
 const from={x:p.x,y:p.y+.8,z:p.z},to={x:d.x,y:d.y+.8,z:d.z},length=Math.hypot(to.x-from.x,to.z-from.z),hit=geometry()?.sweep(from,to,.05);
 if(hit&&hit.distance<length-Math.max(.8,d.radius+.3))return {error:'L’arbre est derrière un obstacle.'};
 cancel(raw);t.worker=id;t.lastWorkAt=state.at;t.startHP=p.hp;t.start={x:p.x,z:p.z};raw.chopping=t.id;raw.input={x:0,z:0};raw.moving=false;return {ok:true};
 }
 function update(){forest.at=state.at;for(const t of forest.trees){const stage=growth(t,state.at);if(t.stage!==stage){t.stage=stage;forest.revision++;}if(stage===4&&t.cutAt!=null){t.cutAt=null;t.work=0;forest.revision++;}if(!t.worker)continue;const p=state.players[t.worker];if(!valid(p,t)||p.hp<t.startHP||Math.hypot(p.x-t.start.x,p.z-t.start.z)>.3||state.stoppedAt){cancel(p);t.worker=null;continue;}const elapsed=Math.max(0,Math.min(1000,state.at-t.lastWorkAt));t.lastWorkAt=state.at;t.work+=elapsed;if(t.work<CUT_TIME)continue;
 const d=definitions.get(t.id),owner=p.id;t.cutAt=state.at;t.stage=0;t.fallAngle=Math.atan2(d.x-p.x,d.z-p.z);cancel(p);t.work=0;forest.wood+=d.wood;forest.stone+=d.stone??0;forest.revision++;emit('tree-felled','',{tree:t.id,actor:owner,wood:d.wood,stone:d.stone??0,position:{x:d.x,y:d.y,z:d.z}});
 }}
 function build(type,perform){const cost=COSTS[type];if(cost==null)return perform();if(forest.wood<cost)return {error:`Bois insuffisant : ${cost} nécessaires, ${forest.wood} disponibles.`};const result=perform();if(result.ok){forest.wood-=cost;forest.revision++;}return result;}
 function reset(){forest.wood=0;forest.stone=0;forest.revision++;for(const t of forest.trees)Object.assign(t,{cutAt:null,work:0,worker:null,stage:4});for(const p of Object.values(state.players))p.chopping=null;}
 return {action,update,cancel,build,reset,snapshot:()=>({...forest,costs:COSTS,cutTime:CUT_TIME,regrowTime:REGROW_TIME})};
}
module.exports={createForestry,growth,CUT_TIME,REGROW_TIME,COSTS,REACH,TREES};
