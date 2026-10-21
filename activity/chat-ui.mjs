export function createActivityChat({send,getRP=()=>false,visible=true}){
const chat = document.createElement("form");
chat.id = "sky-chat";
chat.hidden = !visible;
chat.style.cssText = "position:fixed;right:16px;bottom:70px;z-index:15;width:300px;max-width:calc(100vw - 32px);padding:10px;box-sizing:border-box;background:#211c2aee;border:1px solid #b49760;border-radius:5px;color:#ffe7b0;font:13px system-ui";
const chatLabel = document.createElement("label");
chatLabel.textContent = "Discussion";
const chatInput = document.createElement("input");
chatInput.name = "message"; chatInput.maxLength = 4000; chatInput.autocomplete = "off";
chatInput.placeholder = "Votre message…";
chatInput.style.cssText = "box-sizing:border-box;width:100%;padding:8px;margin:6px 0;color:#211c2a;background:#fff3d6;border:0;border-radius:3px";
chatLabel.append(chatInput);
const chatSend = document.createElement("button"); chatSend.type = "submit"; chatSend.textContent = "Envoyer";
chatSend.style.cssText = "padding:6px 12px;background:#f3dfb4;color:#332319;border:0;border-radius:3px;cursor:pointer";
chat.append(chatLabel,chatSend); document.body.append(chat);
chat.addEventListener("submit", event => { event.preventDefault(); if (send(chatInput.value,getRP())) chatInput.value = ""; });
const chatToggle=document.createElement("button");chatToggle.id="sky-chat-toggle";chatToggle.type="button";chatToggle.textContent="💬";chatToggle.title="Discussion";chatToggle.setAttribute("aria-label","Discussion");chatToggle.setAttribute("aria-expanded","false");
const mobileStyle=document.createElement("style");mobileStyle.textContent="#sky-chat-toggle{display:none;position:fixed;right:12px;bottom:138px;z-index:25;min-height:44px;padding:8px 12px;background:#211c2a;color:#ffe7b0;border:1px solid #b49760;border-radius:5px;font:15px AveriaSky,sans-serif}body[data-sky-touch] #sky-chat-toggle{display:block}body[data-sky-touch] #sky-chat:not([data-open]){display:none}body[data-sky-touch] #sky-chat{bottom:190px}@media(any-pointer:coarse),(max-width:600px){#sky-chat-toggle{display:block}#sky-chat:not([data-open]){display:none}#sky-chat{bottom:190px!important;z-index:26!important}}";
document.head.append(mobileStyle);document.body.append(chatToggle);
chatToggle.addEventListener("click",()=>{const open=!chat.hasAttribute("data-open");chat.toggleAttribute("data-open",open);chatToggle.setAttribute("aria-expanded",String(open));if(open)chatInput.focus();else chatInput.blur();});
chatInput.addEventListener("focus", () => window.dispatchEvent(new Event("blur")));
// Keep the world framing stable when a mobile keyboard covers the activity.
try{if(navigator.virtualKeyboard)navigator.virtualKeyboard.overlaysContent=true;}catch{}
function keyboardInset(){const v=window.visualViewport;const editing=document.activeElement===chatInput;const inset=editing?Math.max(navigator.virtualKeyboard?.boundingRect?.height??0,innerHeight-(v?.height??innerHeight)-(v?.offsetTop??0),0):0;document.documentElement.style.setProperty("--sky-keyboard-inset",inset+"px");}
chatInput.addEventListener("focus",()=>{document.body.dataset.skyEditing="true";keyboardInset();});navigator.virtualKeyboard?.addEventListener("geometrychange",keyboardInset);window.visualViewport?.addEventListener("resize",keyboardInset);addEventListener("resize",keyboardInset);chatInput.addEventListener("blur",()=>{delete document.body.dataset.skyEditing;document.documentElement.style.setProperty("--sky-keyboard-inset","0px");dispatchEvent(new Event("resize"));});

return {chat,chatInput,chatToggle};
}
