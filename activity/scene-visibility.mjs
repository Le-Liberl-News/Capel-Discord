import * as THREE from "three";
// Only the foreground above the player's head is cut; floors and rear walls stay.
export function createArenaCutaway() {
  const upper = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1.8);
  const foreground = new THREE.Plane(new THREE.Vector3(0, 0, 1), 2.5);
  return {
    planes: [upper, foreground],
    update(camera, focus) {
      upper.constant = focus.y + 1.8;
      camera.getWorldDirection(foreground.normal);
      foreground.normal.y = 0;
      foreground.normal.normalize();
      foreground.constant = 2.5 - foreground.normal.dot(focus);
    },
    visible(point) { return upper.distanceToPoint(point) >= 0 || foreground.distanceToPoint(point) >= 0; },
  };
}
export function versionAsset(url, version) {
  if (/^(data|blob):/.test(String(url))) return String(url);
  const result = new URL(url);
  result.searchParams.set("v", version);
  return result.href;
}
