export function installCinematicStyle(){
 if(document.getElementById('sky-cinematic-style'))return;
 const style=document.createElement('style');style.id='sky-cinematic-style';style.textContent=`body:is([data-sky-cinematic],[data-sky-intro])> :not(canvas):not(#sky-dialogues):not(#sky-duel-intro):not(.sky-cinematic-element):not(script):not(style){visibility:hidden!important;pointer-events:none!important}body[data-sky-cinematic] #sky-dialogues{z-index:120} .sky-letterbox{position:fixed;inset:0;border-top:9vh solid #000;border-bottom:9vh solid #000;box-sizing:border-box;pointer-events:none;z-index:115}`;document.head.append(style);
}
