import motion from './combat-motion.cjs';

// Apply the final sample even when a frame/poll skips past the dash duration.
// Retained server attacks must never restart a locally completed segment.
export function dashPlayback(actions,actor,elapsed,specFor){
 for(const event of [...actions.values()].reverse()){
  const spec=specFor(event);
  if(event.actor!==actor||event.cancelled||!(spec?.dash||spec?.leap))continue;
  if(['trinity','phoenix','flameSlash','altinaSword','daybreak'].includes(spec.special)){
   if(event.localDashFinished)return null;
   const time=event.dashFinished?Math.max(elapsed(event),spec.windup+(spec.leapDuration??spec.dashDuration)):elapsed(event);
   return {event,...motion.combatMotion(event,time,spec)};
  }
  if(!event.dashFinished)return {event,...motion.combatMotion(event,elapsed(event),spec)};
 }
 return null;
}
