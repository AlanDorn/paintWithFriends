//Helper function for spline generate
export function mirrorAcross(basePoint, pointToMirror) {
  return [
    2 * basePoint[0] - pointToMirror[0],
    2 * basePoint[1] - pointToMirror[1],
  ];
}
//Catmull-Rom pixel rendering
const tolerance = 0.5;
export function splinePixels(fourPoints) {
  const [p0, p1, p2, p3] = fourPoints;

  const interpolate = (t, p0, p1, p2, p3) =>
    0.5 *
    (2 * p1 +
      t * (-p0 + p2) +
      t * t * (2 * p0 - 5 * p1 + 4 * p2 - p3) +
      t * t * t * (-p0 + 3 * p1 - 3 * p2 + p3));

  const derivative = (t, p0, p1, p2, p3) =>
    0.5 *
    (-p0 +
      p2 +
      2 * t * (2 * p0 - 5 * p1 + 4 * p2 - p3) +
      3 * t * t * (-p0 + 3 * p1 - 3 * p2 + p3));

  const pixels = [];
  let t = 0;
  let prevX = interpolate(t, p0[0], p1[0], p2[0], p3[0]);
  let prevY = interpolate(t, p0[1], p1[1], p2[1], p3[1]);
  pixels.push([prevX, prevY]);
  while (t < 1) {
    const dx = derivative(t, p0[0], p1[0], p2[0], p3[0]);
    const dy = derivative(t, p0[1], p1[1], p2[1], p3[1]);
    const velocity = Math.sqrt(dx * dx + dy * dy);

    const dt = tolerance / velocity;

    t += dt;
    if (t > 1) t = 1;

    const x = interpolate(t, p0[0], p1[0], p2[0], p3[0]);
    const y = interpolate(t, p0[1], p1[1], p2[1], p3[1]);
    const differentThanBefore = prevX !== x || prevY !== y;
    const notNegative = x >= 0 && y >= 0;
    if (differentThanBefore && notNegative) pixels.push([x, y]);
    prevX = x;
    prevY = y;
  }
  return pixels;
}