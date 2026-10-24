function gainAt(listener,source,{near=3,far=42}={}){if(!listener||!source)return 0;const d=Math.hypot(listener.x-source.x,(listener.y??0)-(source.y??0),listener.z-source.z);if(!Number.isFinite(d)||d>=far)return 0;if(d<=near)return 1;return ((far-d)/(far-near))**2;}
module.exports={gainAt};
