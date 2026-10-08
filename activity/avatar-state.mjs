export const positionOf = player => ({x:player.x,y:player.y??0,z:player.z});
// Keep predicted coordinates without copying old appearance or identity fields.
export const avatarAtPosition = (player,position) => ({...player,...positionOf(position)});
