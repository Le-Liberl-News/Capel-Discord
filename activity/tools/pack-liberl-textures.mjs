import fs from 'node:fs/promises';
import path from 'node:path';
export async function packTextures(gltf,folder){
 const chunks=[];let length=0;
 const buffer=gltf.buffers.length;
 for(const image of gltf.images){const data=await fs.readFile(path.join(folder,image.uri)),padding=(4-length%4)%4;
  if(padding){chunks.push(Buffer.alloc(padding));length+=padding;}
  const view=gltf.bufferViews.length;gltf.bufferViews.push({buffer,byteOffset:length,byteLength:data.length});chunks.push(data);length+=data.length;
  delete image.uri;image.bufferView=view;image.mimeType='image/png';
 }
 const bytes=Buffer.concat(chunks);gltf.buffers.push({uri:'textures.bin',byteLength:bytes.length});await fs.writeFile(path.join(folder,'textures.bin'),bytes);return bytes;
}
