export function nativeRing(vertices,rect=[0,0,1,1]){
 const [a,b]=vertices,[u,v,endU,v2]=rect,u2=endU===u?u+.0001:endU,positions=[],uv=[],indices=[],segments=32;
 for(let i=0;i<=segments;i++){const t=i/segments,angle=t*Math.PI*2;for(const [radius,edge]of [[Math.abs(a[0]),0],[Math.abs(b[0]),1]]){positions.push([Math.cos(angle)*radius,0,Math.sin(angle)*radius]);uv.push([u+(u2-u)*t,v+(v2-v)*edge]);}if(i<segments){const j=i*2;indices.push(j,j+1,j+2,j+2,j+1,j+3);}}
 return {positions,uv,indices};
}
export function nativeCrossBeam(vertices,rect=[0,0,1,1]){
 const [a,b]=vertices,[u,v,u2,v2]=rect,positions=[[a[0],a[1],0],[b[0],a[1],0],[a[0],b[1],0],[b[0],b[1],0],[0,a[1],a[0]],[0,a[1],b[0]],[0,b[1],a[0]],[0,b[1],b[0]]];
 return {positions,uv:[[u,v],[u2,v],[u,v2],[u2,v2],[u,v],[u2,v],[u,v2],[u2,v2]],indices:[0,1,2,2,1,3,4,5,6,6,5,7]};
}
