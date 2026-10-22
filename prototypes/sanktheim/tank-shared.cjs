const SCALE=2/3,APPROACH_SPEED=1.2,STOP_X=-47,BODY_HEIGHT=2.8;
const CREW_SIZE=1.85,CREW_Y=3.1,CREW_SPACING=1.7,VACUUM_WIDTH=1.25,VACUUM_HEIGHT=.34,VACUUM_DROP=.56;
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').replace(/^schera$/,'scherazard');
function advanceX(x,seconds){return x+Math.sign(STOP_X-x)*Math.min(Math.abs(STOP_X-x),APPROACH_SPEED*seconds);}
function crewPose(index,time){return {x:-.1,y:CREW_Y+Math.sin(time*.004+index)*.05,z:(index-1)*CREW_SPACING};}
function texture(member){return '/assets/sky/chat/pom/'+slug(member.character??'Estelle')+'-'+(member.kind==='funebre'?'funebre':'aspi')+'.png';}
function tracking(position){return {position:{x:position.x-8,y:position.y+10,z:position.z+10},target:{x:position.x,y:position.y+1.8,z:position.z}};}
module.exports={SCALE,APPROACH_SPEED,STOP_X,BODY_HEIGHT,CREW_SIZE,CREW_Y,CREW_SPACING,VACUUM_WIDTH,VACUUM_HEIGHT,VACUUM_DROP,advanceX,crewPose,texture,tracking};
