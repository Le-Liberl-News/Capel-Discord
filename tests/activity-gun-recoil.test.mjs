import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createGunRecoil,releasedShots} from '../activity/gun-recoil.mjs';
import native from '../activity/native-combat.cjs';
test('Carna recoils once per bullet, through the full three seconds, never during reload',()=>{
 const update=createGunRecoil(native.combatSpec,()=>1),e={id:'a',kind:'basic',localStart:0};
 let pitch=0;for(let t=0;t<5000;t+=10){pitch+=update(e,'Carna',t,true).pitch;assert.equal(update(e,'Carna',t,true).pitch,0);}
 assert.ok(Math.abs(pitch+.15)<1e-8);
});
test('Josette kicks harder, and intros and old network shots do not kick',()=>{
 const update=createGunRecoil(native.combatSpec,()=>0),e={id:'a',kind:'basic',localStart:0};
 assert.equal(update(e,'Josette',0,false).pitch,0);
 assert.deepEqual(update(e,'Josette',0,true),{pitch:-.065,yaw:-.025});
 assert.equal(update({...e,id:'old'},'Josette',1000,true).pitch,0);
});
test('cancelled volleys have no releases and requested native impacts are authoritative',()=>{
 assert.deepEqual(releasedShots({cancelled:true},native.combatSpec('Carna','craft'),0),[]);
 for(const c of ['Carna','Josette'])for(const kind of ['basic','craft'])assert.equal(native.combatSpec(c,kind).hitEffect,'SC/sbkicon._ef');
});
