const {texteAlcoolise}=require('../rpg/alcool');
function createActivitySpeech({relay,players,matchFor}){
 return event=>event.rp===true?relay.speech({...event,text:texteAlcoolise(event.text,players()?.[event.character]),match:matchFor(event.actor)}):undefined;
}
module.exports={createActivitySpeech};
