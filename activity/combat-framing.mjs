// Shift only the orthographic combat view; keep FPS, flight and cinematic cameras unchanged.
export function frameCombatCamera(camera,zoom,aspect,combat,focus=0){camera.left=-zoom*aspect;camera.right=zoom*aspect;const shift=combat?zoom*.6*(1-Math.max(0,Math.min(1,focus))):0;camera.top=zoom+shift;camera.bottom=-zoom+shift;camera.updateProjectionMatrix();}

export function advanceCraftFocus(value,seconds,active){return value+((active?1:0)-value)*(1-Math.exp(-20*Math.max(0,Math.min(seconds,.1))));}
