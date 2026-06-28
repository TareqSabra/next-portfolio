export interface GeoPoint {
  lat: number;
  lon: number;
}

const MAP_WIDTH = 800;
const MAP_HEIGHT = 360;

function mercatorX(lon: number): number {
  return MAP_WIDTH * (lon + 180) / 360;
}

function mercatorY(lat: number): number {
  const latRad = lat * Math.PI / 180;
  return MAP_HEIGHT / 2 - MAP_HEIGHT * Math.log(Math.tan(Math.PI / 4 + latRad / 2)) / (2 * Math.PI);
}

const CALIBRATION: Array<{ lon: number; lat: number; actualX: number; actualY: number }> = [
  { lon: 121.47, lat: 31.23, actualX: 640, actualY: 190 },
  { lon: 4.47, lat: 51.92, actualX: 390, actualY: 110 },
  { lon: 103.81, lat: 1.35, actualX: 600, actualY: 270 },
  { lon: -118.26, lat: 33.74, actualX: 180, actualY: 185 },
];

function computeOffsets(lon: number, lat: number): { dx: number; dy: number } {
  let totalWeight = 0;
  let dx = 0;
  let dy = 0;

  for (const pt of CALIBRATION) {
    const dLon = pt.lon - lon;
    const dLat = pt.lat - lat;
    const distSq = dLon * dLon + dLat * dLat;
    if (distSq < 0.01) {
      return { dx: pt.actualX - mercatorX(pt.lon), dy: pt.actualY - mercatorY(pt.lat) };
    }
    const weight = 1 / distSq;
    dx += weight * (pt.actualX - mercatorX(pt.lon));
    dy += weight * (pt.actualY - mercatorY(pt.lat));
    totalWeight += weight;
  }

  return { dx: dx / totalWeight, dy: dy / totalWeight };
}

export function project(lon: number, lat: number): { x: number; y: number } {
  const baseX = mercatorX(lon);
  const baseY = mercatorY(lat);
  const { dx, dy } = computeOffsets(lon, lat);
  return { x: Math.round(baseX + dx), y: Math.round(baseY + dy) };
}

export function generatePathD(
  origin: GeoPoint,
  destination: GeoPoint,
  via?: GeoPoint,
): string {
  const o = project(origin.lon, origin.lat);
  const d = project(destination.lon, destination.lat);

  if (via) {
    const v = project(via.lon, via.lat);
    return `M ${o.x},${o.y} Q ${(o.x + v.x) / 2},${(o.y + v.y) / 2 + 20} ${v.x},${v.y} T ${d.x},${d.y}`;
  }

  const midX = (o.x + d.x) / 2;
  const midY = (o.y + d.y) / 2 + 30;
  return `M ${o.x},${o.y} Q ${midX},${midY} ${d.x},${d.y}`;
}
