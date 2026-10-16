// Shift only the orthographic combat view; keep FPS, flight and cinematic cameras unchanged.
export function frameCombatCamera(camera,zoom,aspect,combat){camera.left=-zoom*aspect;camera.right=zoom*aspect;const shift=combat?zoom*.6:0;camera.top=zoom+shift;camera.bottom=-zoom+shift;camera.updateProjectionMatrix();}
