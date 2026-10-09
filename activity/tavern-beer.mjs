import tavern from './tavern-world.cjs';
export function createTavernBeer(THREE,scene){
 const group=new THREE.Group();group.position.set(tavern.BEER.x,tavern.BEER.y+.012,tavern.BEER.z);
 const glass=new THREE.MeshBasicMaterial({color:0xd5c493});
 const beer=new THREE.MeshBasicMaterial({color:0xd39522});
 const foam=new THREE.MeshBasicMaterial({color:0xfff0d0});
 const cup=new THREE.Mesh(new THREE.CylinderGeometry(.1,.09,.23,12),glass);cup.position.y=.115;group.add(cup);
 const drink=new THREE.Mesh(new THREE.CylinderGeometry(.085,.085,.012,12),beer);drink.position.y=.231;group.add(drink);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.085,12,6),foam);head.scale.y=.2;head.position.y=.241;group.add(head);
 const handle=new THREE.Mesh(new THREE.TorusGeometry(.065,.018,6,12),glass);handle.position.set(.11,.13,0);group.add(handle);
 scene.add(group);return group;
}
