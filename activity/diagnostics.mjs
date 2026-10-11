const events=[],incidents=[];
const point=p=>p&&Object.fromEntries(['x','y','z'].filter(k=>Number.isFinite(p[k])).map(k=>[k,p[k]]));
function captureDiagnostic(type,data={},incident=false){const e={at:Date.now(),type,...data};events.push(e);while(events.length>600||events[0]?.at<e.at-120000)events.shift();if(incident){incidents.push({at:e.at,type,events:clone(events.slice(-150))});if(incidents.length>8)incidents.shift();}}
function captureRequest(url,options,response,status,duration,error){let route;try{const u=new URL(url,'https://local.invalid');route=u.searchParams.get('r')??u.pathname.split('/').at(-1);}catch{return;}if(route!=='state')return;let body;try{body=JSON.parse(options.body??'{}');}catch{body={};}const trace=Array.isArray(body.trace)?body.trace:[];recordDiagnostic('request',{status,durationMs:Math.round(duration),error:error?.name,submitted:{position:point(body),sequence:body.sequence,traceCount:trace.length,first:point(trace[0]),last:point(trace.at(-1)),action:body.action?.type,kind:body.action?.kind},received:response?{position:point(response.position),sequence:response.movementSequence,map:response.map,relocated:response.relocated,serverTime:response.health?.serverTime,hp:response.health?.hp,respawn:response.health?.respawn,movementFactor:response.health?.movementFactor,combatLockedUntil:response.health?.combatLockedUntil,actionRejected:!!response.actionResult?.error}:undefined},!!error||status>=400);}
export function recordCorrection(before,received,submitted,map){recordDiagnostic('rollback',{map,before:point(before),received:point(received),submitted:point(submitted),sequence:submitted?.sequence},true);}
export function diagnosticReport(){return {format:1,createdAt:new Date().toISOString(),events:clone(events),incidents:clone(incidents)};}
export function downloadDiagnostics(){
 recordDiagnostic('user-mark',{},true);
 document.getElementById('sky-diagnostic-export')?.remove();
 const text=JSON.stringify(diagnosticReport(),null,2);
 const dialog=document.createElement('dialog');dialog.id='sky-diagnostic-export';
 dialog.style.cssText='width:min(640px,85vw);background:#fff3d5;color:#241b15;border:2px solid #b68b42;border-radius:8px;padding:20px;z-index:10000';
 const title=document.createElement('h2');title.textContent='Diagnostic';title.style.margin='0 0 12px';
 const field=document.createElement('textarea');field.value=text;field.readOnly=true;field.setAttribute('aria-label','Diagnostic JSON');
 field.style.cssText='display:block;width:100%;box-sizing:border-box;height:45vh;background:#fff;color:#222;font:12px monospace;margin-bottom:12px';
 const status=document.createElement('p');status.setAttribute('role','status');status.textContent='Copiez le diagnostic ou enregistrez le fichier JSON.';
 const copy=document.createElement('button');copy.type='button';copy.textContent='Copier';
 copy.onclick=async()=>{try{await navigator.clipboard.writeText(text);status.textContent='Diagnostic copié.';}catch{field.focus();field.select();let copied=false;try{copied=document.execCommand('copy');}catch{}status.textContent=copied?'Diagnostic copié.':'Texte sélectionné : utilisez Ctrl+C ou la commande Copier.';}};
 const save=document.createElement('button');save.type='button';save.textContent='Enregistrer le JSON';save.style.margin='0 8px';
 save.onclick=()=>{try{const blob=new Blob([text],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='sky-diagnostic-'+Date.now()+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);status.textContent='Téléchargement demandé. Si rien ne se passe, utilisez Copier.';}catch{status.textContent='Téléchargement indisponible : utilisez Copier.';}};
 const close=document.createElement('button');close.type='button';close.textContent='Fermer';close.onclick=()=>dialog.close();
 dialog.append(title,field,copy,save,close,status);document.body.append(dialog);dialog.addEventListener('close',()=>dialog.remove(),{once:true});dialog.showModal();
}


function clone(value){return JSON.parse(JSON.stringify(value));}
export function recordDiagnostic(...args){try{captureDiagnostic(...args);}catch{ /* Diagnostics must never interrupt gameplay. */ }}
export function recordRequest(...args){try{captureRequest(...args);}catch{ /* Preserve the original network result. */ }}
