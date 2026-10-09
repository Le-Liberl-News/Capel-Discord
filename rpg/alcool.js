function estAlcoolise(player){return !!player?.statuts?.some(s=>s.nom==='alcoolise');}
function texteAlcoolise(text,player,random=Math.random){
 if(!text||!estAlcoolise(player))return text;
 const result=text.split(' ').map(word=>random()<.15?word+' '+(random()<.5?'*hic*':'*hips*'):word).join(' ');
 return result.includes('*hic*')||result.includes('*hips*')?result:result+' ... *hic*';
}
module.exports={estAlcoolise,texteAlcoolise};
