// The menus' pickers, over the home menu (home-menu.mjs): who you play (portraits of the characters given) and the
// Discord member to challenge (the server's members, searched by their names on the server).
// Each screen resolves with the choice, null when the player cancels it, undefined when it is closed (close()).
const PANEL='background:#211c2af2;color:#ffe7b0;border:2px solid #b49760;border-radius:8px;padding:18px 22px;text-align:center;font:18px Cinzel,Georgia,serif;box-shadow:0 8px 32px #000a;max-width:min(92vw,980px);max-height:88vh;overflow:auto';
const QUIET='display:block;margin:12px auto 0;font:14px Cinzel,Georgia,serif;background:none;border:none;color:#c9b48a;cursor:pointer;text-decoration:underline';
export function createSoloMenu({assets}){
 let current=null;
 function screen(title,note,build,cancelLabel='Annuler'){
  close();
  return new Promise(resolve=>{
   const box=document.createElement('div');box.style.cssText='position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;background:#000a';
   const panel=document.createElement('div');panel.style.cssText=PANEL;
   const heading=document.createElement('p');heading.textContent=title;heading.style.cssText='margin:0 0 6px;font-size:22px';panel.append(heading);
   if(note){const p=document.createElement('p');p.textContent=note;p.style.cssText='margin:0 0 14px;font:14px system-ui;color:#d9c49a';panel.append(p);}
   const done=value=>{if(current!==box)return;current=null;box.remove();resolve(value);};
   build(panel,done);
   const cancel=document.createElement('button');cancel.type='button';cancel.textContent=cancelLabel;cancel.style.cssText=QUIET;cancel.onclick=()=>done(null);panel.append(cancel);
   box.append(panel);document.body.append(box);current=box;box._settle=resolve;
  });
 }
 // closing a screen (another one opens, or the fight starts) answers it with undefined
 function close(){if(current){const box=current;current=null;box.remove();box._settle(undefined);}}
 return {
  close,
  // { id, name } of the member chosen; search(text) gives the server's members matching it: [{ id, name, avatar }]
  player({search}){return screen('Défier un joueur','Le joueur choisi reçoit un MP pour accepter.',(panel,done)=>{
   const input=document.createElement('input');input.type='search';input.placeholder='Rechercher un joueur…';input.maxLength=40;input.style.cssText='box-sizing:border-box;width:100%;font:15px system-ui;padding:8px 10px;border-radius:5px;border:1px solid #b49760;background:#2a2019;color:#ffe7b0';
   const list=document.createElement('div');list.style.cssText='margin-top:8px;max-height:min(44vh,340px);overflow:auto;display:flex;flex-direction:column;gap:4px;min-width:min(80vw,380px);text-align:left';
   let asked=0,timer=null;
   const show=(text)=>{const p=document.createElement('p');p.textContent=text;p.style.cssText='margin:8px;font:14px system-ui;color:#c9b48a;text-align:center';list.replaceChildren(p);};
   async function refresh(){
    const ticket=++asked;show('Recherche…');
    try{
     const players=await search(input.value.trim());if(ticket!==asked)return;
     if(!players.length){show('Aucun joueur ne correspond.');return;}
     list.replaceChildren(...players.map(p=>{
      const b=document.createElement('button');b.type='button';b.dataset.player=p.id;
      b.style.cssText='display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:5px;border:1px solid #6d5a3f;background:#2a2019;color:#ffe7b0;cursor:pointer;font:15px system-ui;text-align:left';
      const face=document.createElement('div');face.style.cssText='width:32px;height:32px;flex:none;border-radius:50%;background:#1a1411 center/cover no-repeat';if(p.avatar)face.style.backgroundImage='url('+JSON.stringify(p.avatar)+')';
      const name=document.createElement('span');name.textContent=p.name;name.style.cssText='overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
      b.onmouseenter=()=>{b.style.borderColor='#ffd27a';b.style.background='#3a2c22';};b.onmouseleave=()=>{b.style.borderColor='#6d5a3f';b.style.background='#2a2019';};
      b.onclick=()=>done({id:p.id,name:p.name});b.append(face,name);return b;
     }));
    }catch(error){if(ticket===asked)show(error.message||'Liste des joueurs indisponible.');}
   }
   input.oninput=()=>{clearTimeout(timer);timer=setTimeout(refresh,250);};
   panel.append(input,list);void refresh();setTimeout(()=>input.focus(),0);
  });},
  // characters: [{ name, portrait, sheet }] (portrait: a path of the assets; else the sheet's front frame: { texture, columns, rows })
  character({characters,note}){return screen('Qui incarnez-vous ?',note,(panel,done)=>{
   const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(86px,1fr));gap:8px;min-width:min(80vw,760px)';
   for(const c of characters){
    const b=document.createElement('button');b.type='button';b.title=c.name;b.dataset.character=c.name;
    b.style.cssText='display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 4px;border-radius:6px;border:1px solid #6d5a3f;background:#2a2019;color:#ffe7b0;cursor:pointer;font:12px system-ui';
    const face=document.createElement('div');face.style.cssText='width:72px;height:72px;border-radius:4px;background:#1a1411 center/cover no-repeat';
    if(c.portrait)face.style.backgroundImage='url('+JSON.stringify(new URL(c.portrait,assets).href)+')';
    else if(c.sheet?.texture){const {texture,columns=1,rows=1}=c.sheet;face.style.backgroundImage='url('+JSON.stringify(new URL(texture,assets).href)+')';face.style.backgroundSize=`${columns*100}% ${rows*100}%`;face.style.backgroundPosition=`${columns>6?6/(columns-1)*100:0}% 0`;face.style.imageRendering='pixelated';}
    else{face.textContent=c.name[0];face.style.cssText+=';display:flex;align-items:center;justify-content:center;font:32px Cinzel,Georgia,serif';}
    const label=document.createElement('span');label.textContent=c.name;label.style.cssText='max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
    b.onmouseenter=()=>{b.style.borderColor='#ffd27a';b.style.background='#3a2c22';};b.onmouseleave=()=>{b.style.borderColor='#6d5a3f';b.style.background='#2a2019';};
    b.onclick=()=>done(c.name);b.append(face,label);grid.append(b);
   }
   panel.append(grid);
  });},
  // a last check before something that cannot be taken back (a challenge sent): true, or null when cancelled
  confirm(question,yes){return screen(question,null,(panel,done)=>{
   const b=document.createElement('button');b.type='button';b.textContent=yes;
   b.style.cssText='font:18px Cinzel,Georgia,serif;padding:10px 26px;margin:10px 6px 0;border-radius:6px;border:1px solid #b49760;background:#3a2c22;color:#ffe7b0;cursor:pointer';
   b.onclick=()=>done(true);panel.append(b);
  });},
  // why a choice of the menu cannot go on
  notice(text){return screen('Menu',text,()=>{},'Fermer');}
 };
}