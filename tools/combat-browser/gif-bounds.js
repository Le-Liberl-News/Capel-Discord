export function unionAlphaBounds(previous,rgba,width,height){
 let left=width,top=height,right=-1,bottom=-1;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(rgba[(y*width+x)*4+3]>0){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
 if(right<0)return previous;
 return {left:Math.min(previous?.left??left,left),top:Math.min(previous?.top??top,top),right:Math.max(previous?.right??right,right),bottom:Math.max(previous?.bottom??bottom,bottom)};
}
