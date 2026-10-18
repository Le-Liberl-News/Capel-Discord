const PRESETS={
 day:{label:'Jour',tint:[1,1,1],sky:[1,1,1],daylight:1,lamps:0,sun:3.5,ambient:1.05,sunColor:0xffeed5,fog:null},
 night:{label:'Nuit',tint:[.55,.63,.82],sky:[.18,.25,.43],daylight:.08,lamps:1,sun:.35,ambient:1.2,sunColor:0x9ebaff,fog:0x192638},
 sunset:{label:'Coucher de soleil',tint:[1,.83,.68],sky:[1,.48,.29],daylight:.55,lamps:.55,sun:3.8,ambient:1.4,sunColor:0xffa35b,fog:0x886157},
 rain:{label:'Pluie',tint:[.62,.69,.78],sky:[.38,.46,.56],daylight:.35,lamps:.6,sun:.45,ambient:1.25,sunColor:0xb8cbe1,fog:0x6b7d8c},
 flames:{label:'Géhenne · Flammes',tint:[1,1,1],sky:[1,1,1],daylight:1,lamps:.6}
};
function ambienceFor(map,match='',override){if(map==='gehenna')return 'flames';if(!['arena','axis'].includes(map))return null;if(['day','night','sunset','rain'].includes(override))return override;if(!match)return 'day';let hash=2166136261;for(const c of String(match))hash=Math.imul(hash^c.charCodeAt(0),16777619);return ['day','night','sunset','rain'][(hash>>>0)%4];}
module.exports={PRESETS,ambienceFor};
