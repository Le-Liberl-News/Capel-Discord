// Keep the least delayed clock estimate. A slow reply must not rewind a jump.
function createClock(){let best=null;return {offset(server,received){const next=server-received;if(best===null||Math.abs(next-best)>60000)best=next;else best=Math.max(best,next);return best;}};}
function acceptsConfirmation(confirmed,latest){return !latest||confirmed.id===latest.id||confirmed.started>latest.started;}
module.exports={createClock,acceptsConfirmation};
