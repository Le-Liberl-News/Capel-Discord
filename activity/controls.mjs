export const CAMERA_PITCH = Math.PI / 4;
export const CAMERA_ZOOM = 3.8260869565;
export function movementKeys(layout) {
 return layout === "QWERTY" ? {up:"w",left:"a",down:"s",right:"d"} : {up:"z",left:"q",down:"s",right:"d"};
}
export function keyboardLayout() {try{return localStorage.getItem("sky-keyboard")==="QWERTY"?"QWERTY":"AZERTY";}catch{return "AZERTY";}}
export function viewportSize(previous, current, editing) {
 return editing && previous && current.width === previous.width && current.height < previous.height ? previous : current;
}

export const BINDING_LABELS={up:'Avancer',down:'Reculer',left:'Gauche',right:'Droite',basic:'Attaque',craft:'Craft',art:'Art',jump:'Saut / Monter',interact:'Interaction',descend:'Descendre',cameraLeft:'Caméra gauche',cameraRight:'Caméra droite'};
export function defaultBindings(){return {up:'KeyW',left:'KeyA',down:'KeyS',right:'KeyD',basic:'KeyF',craft:'KeyG',art:'KeyC',jump:'Space',interact:'KeyX',descend:'ControlLeft',cameraLeft:'KeyE',cameraRight:'KeyR'};}
export function keyBindings(){let custom={};try{custom=JSON.parse(localStorage.getItem('sky-bindings')??'{}');}catch{}return {...defaultBindings(),...custom};}
export function bindKey(action,code){if(!Object.hasOwn(BINDING_LABELS,action)||!/^([A-Za-z0-9]+)$/.test(code))return;const bindings=keyBindings(),previous=bindings[action];for(const a of Object.keys(bindings))if(a!==action&&bindings[a]===code)bindings[a]=previous;bindings[action]=code;try{localStorage.setItem('sky-bindings',JSON.stringify(bindings));}catch{}return bindings;}
export function remapKey(event){const action=Object.entries(keyBindings()).find(([,code])=>code===event.code)?.[0];const moves=movementKeys(keyboardLayout());const codes={up:keyboardLayout()==='QWERTY'?'KeyW':'KeyZ',left:keyboardLayout()==='QWERTY'?'KeyA':'KeyQ',down:'KeyS',right:'KeyD',basic:'KeyF',craft:'KeyG',art:'KeyC',jump:'Space',interact:'KeyX',descend:'ControlLeft',cameraLeft:'KeyE',cameraRight:'KeyR'};if(!action)return Object.values(defaultBindings()).includes(event.code)?{code:'Unbound',key:''}:{code:event.code,key:event.key};return {code:codes[action],key:moves[action]??({jump:' ',descend:'Control',cameraLeft:'e',cameraRight:'r',basic:'f',craft:'g',art:'c',interact:'x'}[action])};}
export function createBindingOptions(parent){const group=document.createElement('details'),title=document.createElement('summary');title.textContent='Touches';group.append(title);const buttons=new Map();let pending=null;
 const refresh=()=>{const keys=keyBindings();for(const [action,b]of buttons)b.textContent=pending===action?'Appuyez sur une touche':(keyboardLayout()==='AZERTY'?({KeyW:'Z',KeyA:'Q',KeyQ:'A',KeyZ:'W'}[keys[action]]??keys[action]):keys[action]).replace(/^Key/,'').replace(/^Digit/,'');};
 for(const [action,name]of Object.entries(BINDING_LABELS)){const row=document.createElement('label');row.style.cssText='display:flex;justify-content:space-between;gap:12px;margin:5px 0';row.append(name);const b=document.createElement('button');b.type='button';b.onclick=()=>{pending=action;refresh();};buttons.set(action,b);row.append(b);group.append(row);}
 const reset=document.createElement('button');reset.type='button';reset.textContent='Réinitialiser';reset.onclick=()=>{try{localStorage.removeItem('sky-bindings');}catch{}pending=null;refresh();};group.append(reset);parent.append(group);refresh();
 window.addEventListener('keydown',e=>{if(!pending)return;e.preventDefault();e.stopImmediatePropagation();if(e.code!=='Escape')bindKey(pending,e.code);pending=null;refresh();dispatchEvent(new Event('blur'));},true);group.addEventListener('toggle',()=>{if(!group.open){pending=null;refresh();}});return group;}

export function bindingLabel(action){const code=keyBindings()[action];return (keyboardLayout()==='AZERTY'?({KeyW:'Z',KeyA:'Q',KeyQ:'A',KeyZ:'W'}[code]??code):code)?.replace(/^Key/,'').replace(/^Digit/,'');}
