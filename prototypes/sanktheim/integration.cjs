// Shared read-only cohort adapter; announcements are delivered by discord.cjs.
function cohortFromRhumertume(event,{daspiCharacters=new Set()}={}){return ()=>event.infected().map(character=>({character,stage:event.level(character),kind:['garou','funebre'].includes(event.variant?.(character))?event.variant(character):daspiCharacters.has(character)?'daspi':'pom'}));}
function ownerControls({ownerId,siege}){if(!ownerId)throw Error('Configure the event owner before enabling controls');return {stop(userId){if(userId!==ownerId)return {error:'Seul le propriétaire de cet événement peut arrêter le siège.'};siege.stop();return {ok:true};}};}
module.exports={cohortFromRhumertume,ownerControls};
