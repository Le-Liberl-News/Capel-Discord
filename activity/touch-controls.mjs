export function createTouchControls({tap,action,camera,setTimer=setTimeout,clearTimer=clearTimeout,holdMs=450,slop=12}) {
  const points=new Map();let timer=null,gesture=null;
  const clearHold=()=>{if(timer!==null)clearTimer(timer);timer=null;};
  const pair=()=>{const [a,b]=[...points.values()];return a&&b?{x:(a.x+b.x)/2,y:(a.y+b.y)/2,distance:Math.hypot(a.x-b.x,a.y-b.y)}:null;};
  return {
    has:id=>points.has(id),
    down(event){
      clearHold();points.set(event.pointerId,{x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,used:false});
      if(points.size>1){for(const p of points.values())p.used=true;gesture=pair();return;}
      timer=setTimer(()=>{timer=null;const p=points.get(event.pointerId);if(!p||p.used||points.size!==1)return;p.used=true;action({clientX:p.x,clientY:p.y});},holdMs);
    },
    move(event){
      const p=points.get(event.pointerId);if(!p)return;p.x=event.clientX;p.y=event.clientY;
      if(Math.hypot(p.x-p.startX,p.y-p.startY)>slop){p.used=true;clearHold();}
      if(points.size>=2){const next=pair();if(gesture&&next&&gesture.distance>1&&next.distance>1)camera({dx:next.x-gesture.x,dy:next.y-gesture.y,scale:gesture.distance/next.distance});gesture=next;}
    },
    up(event,cancelled=false){
      const p=points.get(event.pointerId);if(!p)return;clearHold();points.delete(event.pointerId);gesture=pair();
      if(!cancelled&&!p.used&&Math.hypot(event.clientX-p.startX,event.clientY-p.startY)<=slop)tap({clientX:event.clientX,clientY:event.clientY,button:0});
    },
    reset(){clearHold();points.clear();gesture=null;},
  };
}
