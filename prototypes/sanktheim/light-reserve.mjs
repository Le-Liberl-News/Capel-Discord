// Three.js compiles a shader for each lit material and the number of lights of each kind; when that number changes,
// every lit material compiles again, each compilation freezing the frame (a dozen seconds on Windows, measured with
// startup-profile.mjs). Sanktheim's torches, searchlights and the cannons' headlamps come with their models, one after
// the other: the reserve puts as many unlit lights in the scene from the start, and takes one away as each real one
// comes, so that the count never changes.
export function createLightReserve(T,scene,{point=0,spot=0}={}){
 const kept={point:[],spot:[]};
 const make={point:()=>new T.PointLight(0x000000,0,1),spot:()=>new T.SpotLight(0x000000,0,1)};
 for(const [kind,count]of [['point',point],['spot',spot]])for(let i=0;i<count;i++){const light=make[kind]();light.name='reserved-'+kind;light.position.set(0,-50,0);scene.add(light);kept[kind].push(light);}
 return {
  // a real light of this kind joins the scene now: one stand-in leaves (none left: the count grows, as before)
  take(kind){const light=kept[kind]?.pop();if(light)scene.remove(light);},
  // a real light leaves: a stand-in takes its place again
  give(kind){const light=make[kind]();light.name='reserved-'+kind;light.position.set(0,-50,0);scene.add(light);kept[kind].push(light);},
  left:()=>({point:kept.point.length,spot:kept.spot.length})
 };
}
