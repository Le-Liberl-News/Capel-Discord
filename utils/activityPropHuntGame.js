const {randomBytes,randomInt}=require('node:crypto');
const {ActivityError}=require('./activityService');
function createPropHuntGame({store=null,now=Date.now,chooseHunter=n=>randomInt(n),props=['barrel','crate']}={}) {
 let game=store?.load()??null;
 const save=()=>store?.save(game);
 function finish(winner){game.phase='finished';game.winner=winner;save();}
 function tick(){
  if(!game)return;
  if(game.phase==='waiting'&&now()>game.created+30*60000)finish('cancelled');
  if(game.phase==='preparation'&&now()>=game.preparationEnds){game.phase='hunting';save();}
  if(game.phase==='hunting'&&now()>=game.ends)finish('hiders');
 }
 const member=user=>game?.players.find(p=>p.id===user);
 function role(user){tick();const p=member(user);if(!p)return 'spectator';if(user===game.hunter)return 'hunter';return p.found?'found':'hider';}
 function policy(user){tick();const p=member(user),active=game&&['preparation','hunting'].includes(game.phase);
  return {spectator:!p||!!p.found,canMove:!(active&&user===game.hunter&&game.phase==='preparation'),prop:active&&p&&user!==game.hunter&&!p.found?p.prop:null};
 }
 return {
  create(owner,duration=10){tick();if(game&&game.phase!=='finished')throw new ActivityError('Une partie de Prop Hunt est deja ouverte.');
   if(!Number.isInteger(duration)||duration<1||duration>30)throw new ActivityError('La duree doit etre comprise entre 1 et 30 minutes.');
   game={id:'hunt:'+randomBytes(16).toString('hex'),owner,duration,created:now(),phase:'waiting',players:[]};save();return this.summary();},
  summary(){tick();return game&&{id:game.id,phase:game.phase,count:game.players.length,duration:game.duration,names:game.players.map(p=>p.character)};},
  validateJoin(id,user){tick();if(!game||game.id!==id||game.phase==='finished'||(!member(user)&&game.phase!=='waiting'))throw new ActivityError('Inscriptions fermees ou partie expiree.',403);},
  cancel(id,user){if(game?.id===id&&game.owner===user&&game.phase==='waiting')finish('cancelled');},
  join(id,user,character){tick();if(!game||game.id!==id||game.phase==='finished')throw new ActivityError('Partie expiree.',403);
   if(!member(user)){if(game.phase!=='waiting')throw new ActivityError('Cette partie a deja commence.',403);if(game.players.length>=20)throw new ActivityError('La partie est complete.');game.players.push({id:user,character,found:false});save();}
   return this.status(user);},
  start(id,user){tick();if(!game||game.id!==id||game.owner!==user)throw new ActivityError('Seul le createur peut demarrer cette partie.',403);
   if(game.phase!=='waiting')throw new ActivityError('Cette partie a deja commence.');if(game.players.length<2)throw new ActivityError('Il faut au moins deux joueurs dans Rolent.');
   game.hunter=game.players[chooseHunter(game.players.length)].id;
   for(const p of game.players)p.prop=props[randomInt(props.length)];
   game.phase='preparation';game.preparationEnds=now()+30000;game.ends=game.preparationEnds+game.duration*60000;save();return this.status(user);},
  role,policy,
  status(user){tick();if(!game)return null;return {id:game.id,phase:game.phase,role:role(user),...policy(user),hunter:member(game.hunter)?.character,remaining:game.players.filter(p=>p.id!==game.hunter&&!p.found).length,deadline:game.phase==='preparation'?game.preparationEnds:game.ends,serverTime:now(),winner:game.winner,players:game.players.length};},
  render(players,user){tick();if(game?.phase==='preparation'&&user===game.hunter)return players.filter(p=>p.id===user).map(p=>({...p,...policy(p.id)}));return players.map(p=>({...p,...policy(p.id)}));},
  find(user,action,players,geometry){tick();const me=member(user);
   if(!action||typeof action.id!=='string'||!action.id||action.id.length>80)return {error:'Action invalide.'};
   if(me?.lastAction===action.id)return me.lastResult;
   if(!game||game.phase!=='hunting'||role(user)!=='hunter')return {error:'Vous ne pouvez pas chercher maintenant.'};
   let result;
   if(now()-(me.lastFind??-Infinity)<1000)result={error:'Attendez une seconde avant de chercher a nouveau.'};
   else {
    me.lastFind=now();const hunter=players.find(p=>p.id===user);
    const aim=action.aim;
    const target=players.find(p=>member(p.id)&&p.id!==game.hunter&&!member(p.id).found&&(action.target?p.id===action.target:aim&&[aim.x,aim.z].every(Number.isFinite)&&Math.hypot(p.x-aim.x,p.z-aim.z)<.85));
    if(!hunter||!target||Math.hypot(hunter.x-target.x,hunter.z-target.z)>2.2||Math.abs(hunter.y-target.y)>.6)result={error:'Rien ici. Approchez-vous de l\u2019objet.'};
    else {
     const from={x:hunter.x,y:hunter.y+.8,z:hunter.z},to={x:target.x,y:target.y+.6,z:target.z};
     const block=geometry?.sweep(from,to,0),distance=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);
     if(block&&block.distance<distance-.35)result={error:'Un obstacle vous separe de cet objet.'};
     else {member(target.id).found=true;result={found:true,text:member(target.id).character+' a ete trouve !'};if(game.players.filter(p=>p.id!==game.hunter).every(p=>p.found))finish('hunter');save();}
    }
   }
   me.lastAction=action.id;me.lastResult=result;return result;
  },
  leave(user){tick();const p=member(user);if(!p)return;
   if(game.phase==='waiting')game.players=game.players.filter(p=>p.id!==user);
   else if(['preparation','hunting'].includes(game.phase)){if(user===game.hunter)finish('hiders');else{p.found=true;if(game.players.filter(p=>p.id!==game.hunter).every(p=>p.found))finish('hunter');}}
   save();
  },
 };
}
module.exports={createPropHuntGame};
