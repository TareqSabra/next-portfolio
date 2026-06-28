import { project } from "./projection";

export interface RawPort {
  id: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  countryCode: string;
}

export interface Port {
  id: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  countryCode: string;
  x: number;
  y: number;
}

export const ALL_PORTS: RawPort[] = [
  { id: "CNSHA", name: "Shanghai", code: "CNSHA", lat: 31.23, lon: 121.47, countryCode: "CN" },
  { id: "CNNGB", name: "Ningbo", code: "CNNGB", lat: 29.87, lon: 121.54, countryCode: "CN" },
  { id: "CNSNZ", name: "Shenzhen", code: "CNSNZ", lat: 22.54, lon: 113.96, countryCode: "CN" },
  { id: "CNHKA", name: "Hong Kong", code: "CNHKA", lat: 22.32, lon: 114.17, countryCode: "CN" },
  { id: "SGPIN", name: "Singapore", code: "SGPIN", lat: 1.35, lon: 103.81, countryCode: "SG" },
  { id: "KRPTY", name: "Busan", code: "KRPTY", lat: 35.10, lon: 129.04, countryCode: "KR" },
  { id: "NLRTM", name: "Rotterdam", code: "NLRTM", lat: 51.92, lon: 4.47, countryCode: "NL" },
  { id: "DEHAM", name: "Hamburg", code: "DEHAM", lat: 53.55, lon: 9.97, countryCode: "DE" },
  { id: "BEANR", name: "Antwerp", code: "BEANR", lat: 51.22, lon: 4.41, countryCode: "BE" },
  { id: "USLAX", name: "Los Angeles", code: "USLAX", lat: 33.74, lon: -118.26, countryCode: "US" },
  { id: "USLGB", name: "Long Beach", code: "USLGB", lat: 33.75, lon: -118.19, countryCode: "US" },
  { id: "USNYC", name: "New York", code: "USNYC", lat: 40.71, lon: -74.01, countryCode: "US" },
  { id: "AESAV", name: "Savannah", code: "AESAV", lat: 32.08, lon: -81.09, countryCode: "US" },
  { id: "AEJEA", name: "Jebel Ali", code: "AEJEA", lat: 25.01, lon: 55.06, countryCode: "AE" },
  { id: "VNHDM", name: "Ho Chi Minh", code: "VNHDM", lat: 10.82, lon: 106.78, countryCode: "VN" },
  { id: "MYTPP", name: "Tanjung Pelepas", code: "MYTPP", lat: 1.36, lon: 103.55, countryCode: "MY" },
  { id: "JPYOK", name: "Yokohama", code: "JPYOK", lat: 35.46, lon: 139.62, countryCode: "JP" },
  { id: "GBLON", name: "London", code: "GBLON", lat: 51.50, lon: 0.05, countryCode: "GB" },
  { id: "ESBCN", name: "Barcelona", code: "ESBCN", lat: 41.35, lon: 2.15, countryCode: "ES" },
  { id: "PAFZB", name: "Colon (Cristobal)", code: "PAFZB", lat: 9.35, lon: -79.91, countryCode: "PA" },
];

export function projectPorts(): Port[] {
  return ALL_PORTS.map((raw) => {
    const { x, y } = project(raw.lon, raw.lat);
    return { ...raw, x, y };
  });
}

export function portMap(ports: Port[]): Record<string, Port> {
  const map: Record<string, Port> = {};
  for (const p of ports) {
    map[p.id] = p;
  }
  return map;
}
