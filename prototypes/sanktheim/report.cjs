function soldiersReport(soldiers){
 const fallen=soldiers.filter(s=>s.status==='tombé au combat'&&(s.diedThisWave??s.lost>0));
 if(!fallen.length)return soldiers.some(s=>s.hp<=0)?'Aucun autre soldat n’est tombé pendant cette vague.':'Tous les soldats ont survécu à cette vague.';
 return fallen.map(s=>s.name+' est tombé au combat.').join('\n')+(soldiers.some(s=>s.hp>0)?'\nLes autres soldats ont survécu.':'');
}
function wallsReport(walls){
 const percent=n=>n.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2});
 return walls.map(w=>w.name+' : '+(w.waveDamagePercent==null?percent(w.damagePercent)+' % endommagée':'−'+percent(w.waveDamagePercent)+' % cette vague')+' · '+percent(w.remainingPercent)+' % restants.').join('\n');
}
module.exports={soldiersReport,wallsReport};
