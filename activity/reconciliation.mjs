// Compare the acknowledgement to the snapshot actually sent, never to a
// character that continued moving while the request was in flight.
export function needsCorrection(current, accepted, submitted, flying=false) {
  if (!accepted || !submitted) return false;
  if (Math.hypot(accepted.x - submitted.x, accepted.z - submitted.z,flying?(accepted.y-submitted.y):0) <= 0.02)
    return false;
  return Math.hypot(current.x - accepted.x, current.z - accepted.z,flying?(current.y-accepted.y):0) > (flying?.25:.8);
}
