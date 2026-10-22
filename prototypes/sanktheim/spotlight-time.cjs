// Follow the darkness actually rendered, rather than the separate 20h truce flag.
function strength(state,sky){if(Number.isFinite(sky?.daylight)){const k=Math.max(0,Math.min(1,(.09-sky.daylight)/.075));return k*k*(3-2*k);}const h=state.local?.hour;return Number.isFinite(h)?h>=18||h<7?1:0:state.night?1:0;}
module.exports={strength};
