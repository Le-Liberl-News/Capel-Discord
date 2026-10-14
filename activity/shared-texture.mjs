// Texture.clone() flags the shared image as changed, so three.js re-uploads the whole sheet for every copy
// (a visible hitch for big combat sheets). A copy made here keeps its own offset/repeat but reuses the upload.
export function shareTexture(texture){const version=texture.source.version,copy=texture.clone();if(version>0)copy.source.version=version;return copy;}
