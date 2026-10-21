function variant(e){return e.kind==='garou'?'garou':e.kind==='funebre'?'funebre':e.flying||e.kind==='daspi'?'aspi':e.stage;}
function name(e){return (e.kind==='funebre'?'Pomfunèbre ':e.kind==='garou'?'Pom-garou ':e.flying?'Pom-daspi ':['','Pom ','Pompom ','Pomdeter '][e.stage])+(e.pomCharacter??e.character);}
function height(v){return v==='garou'||v===3?1.35:v==='funebre'?1.25:v==='aspi'?1.2:v===2?.88:.78;}
module.exports={variant,name,height};
