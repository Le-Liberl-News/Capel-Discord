export const CAMERA_PITCH = Math.PI / 4;
export const CAMERA_ZOOM = 5.5;
export function movementKeys(layout) {
 return layout === "QWERTY" ? {up:"w",left:"a",down:"s",right:"d"} : {up:"z",left:"q",down:"s",right:"d"};
}
export function keyboardLayout() {try{return localStorage.getItem("sky-keyboard")==="QWERTY"?"QWERTY":"AZERTY";}catch{return "AZERTY";}}
export function viewportSize(previous, current, editing) {
 return editing && previous && current.width === previous.width && current.height < previous.height ? previous : current;
}
