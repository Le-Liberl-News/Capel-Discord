// The activity's home, in place of the Antérose: a full-screen menu with the solo games (a random fight,
// the tower of Esmelas) or the duels (with the character of the day, against a character played today or a Discord
// member). It shows whenever the player is home (no fight, no tower); the choices themselves are made by the
// callbacks (character and player pickers, see solo-menu.mjs).
const BUTTON='display:block;width:min(78vw,340px);margin:10px auto;font:20px Cinzel,Georgia,serif;padding:14px 18px;border-radius:7px;border:1px solid #b49760;background:#3a2c22;color:#ffe7b0;cursor:pointer;box-shadow:0 3px 14px #0007';
const QUIET='display:block;margin:18px auto 0;font:15px Cinzel,Georgia,serif;background:none;border:none;color:#c9b48a;cursor:pointer;text-decoration:underline';
export function createHomeMenu({randomFight,tower,rivalRP,discordPlayer,ownCharacter=()=>null}){
 // shown and hidden through `display` (an inline display beats the hidden attribute)
 const root=document.createElement('div');root.id='sky-home';
 root.style.cssText='position:fixed;inset:0;z-index:30;display:none;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 35%,#3a2c22 0%,#201b18 60%,#120e0c 100%);color:#ffe7b0;text-align:center;font:16px system-ui;overflow:auto';
 const panel=document.createElement('div');panel.style.cssText='padding:24px 16px;max-width:92vw';root.append(panel);
 let page='main',busy=false;
 const title=(text,size=34)=>{const h=document.createElement('h1');h.textContent=text;h.style.cssText=`margin:0 0 6px;font:${size}px Cinzel,Georgia,serif;letter-spacing:.04em;text-shadow:0 2px 12px #000`;return h;};
 const note=text=>{const p=document.createElement('p');p.textContent=text;p.style.cssText='margin:4px 0 18px;color:#d9c49a';return p;};
 const button=(text,run,style=BUTTON)=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.style.cssText=style;
  b.onmouseenter=()=>{if(style===BUTTON){b.style.borderColor='#ffd27a';b.style.background='#4a382b';}};b.onmouseleave=()=>{if(style===BUTTON){b.style.borderColor='#b49760';b.style.background='#3a2c22';}};
  b.onclick=async()=>{if(busy)return;busy=true;try{await run();}finally{busy=false;}};return b;};
 const go=next=>()=>{page=next;draw();};
 function draw(){
  const own=ownCharacter();
  if(page==='main')panel.replaceChildren(title('Le Liberl News',40),note('Combats, tour d’Esmelas et duels'),button('Jeu solo',go('solo')),button('Duels',go('duels')));
  else if(page==='solo')panel.replaceChildren(title('Jeu solo'),note('Choisissez votre personnage puis c’est parti.'),button('Combat aléatoire',randomFight),button('Tour d’Esmelas',tower),button('Retour',go('main'),QUIET));
  else panel.replaceChildren(title('Duels'),note(own?`Vous jouerez ${own}, votre personnage du jour.`:'Vous jouerez votre personnage du jour.'),button('Adversaire RP',rivalRP),button('Joueur Discord',discordPlayer),button('Retour',go('main'),QUIET));
 }
 draw();document.body.append(root);
 return {
  // shown at home; hidden during a fight, in the tower, in a duel
  show(atHome){const display=atHome?'flex':'none';if(root.style.display===display)return;root.style.display=display;if(atHome)draw();},
  get visible(){return root.style.display!=='none';},
  refresh:draw,
  dispose(){root.remove();}
 };
}