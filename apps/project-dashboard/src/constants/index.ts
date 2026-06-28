import { project, generatePathD } from "@/lib/projection";
import type { RawPort } from "@/lib/ports";
import { ALL_PORTS } from "@/lib/ports";

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

export interface Route {
  id: string;
  name: string;
  origin: Port;
  destination: Port;
  pathD: string;
  status: "On Schedule" | "Delayed" | "Under Review";
  vessel: string;
  progress: number;
}

function toPort(raw: RawPort): Port {
  const { x, y } = project(raw.lon, raw.lat);
  return { ...raw, x, y };
}

export const PORTS: Record<string, Port> = {};
for (const raw of ALL_PORTS) {
  PORTS[raw.id] = toPort(raw);
}

const SGPIN = PORTS.SGPIN;
const NLRTM = PORTS.NLRTM;
const USLAX = PORTS.USLAX;
const CNSHA = PORTS.CNSHA;
const KRPTY = PORTS.KRPTY;
const CNSNZ = PORTS.CNSNZ;
const DEHAM = PORTS.DEHAM;
const AEJEA = PORTS.AEJEA;
const USNYC = PORTS.USNYC;
const JPYOK = PORTS.JPYOK;
const USLGB = PORTS.USLGB;
const CNNGB = PORTS.CNNGB;

export const ROUTES: Route[] = [
  {
    id: "route-1",
    name: "Asia-Europe Express (AEX)",
    origin: CNSHA,
    destination: NLRTM,
    pathD: generatePathD(CNSHA, NLRTM, SGPIN),
    status: "On Schedule",
    vessel: "Cosco Shipping Taurus",
    progress: 65,
  },
  {
    id: "route-2",
    name: "Transpacific Eastbound (TPE)",
    origin: SGPIN,
    destination: USLAX,
    pathD: generatePathD(SGPIN, USLAX),
    status: "On Schedule",
    vessel: "Maersk Mc-Kinney Moller",
    progress: 40,
  },
  {
    id: "route-3",
    name: "Transatlantic Bridge (TAB)",
    origin: NLRTM,
    destination: USLAX,
    pathD: generatePathD(NLRTM, USLAX),
    status: "Delayed",
    vessel: "CMA CGM Antoine de Saint Exupery",
    progress: 80,
  },
  {
    id: "route-4",
    name: "Korea-West Coast Express (KWX)",
    origin: KRPTY,
    destination: USLAX,
    pathD: generatePathD(KRPTY, USLAX),
    status: "On Schedule",
    vessel: "HMM Algeciras",
    progress: 25,
  },
  {
    id: "route-5",
    name: "China-North Europe Link (CNL)",
    origin: CNSNZ,
    destination: DEHAM,
    pathD: generatePathD(CNSNZ, DEHAM, SGPIN),
    status: "On Schedule",
    vessel: "MSC Irina",
    progress: 50,
  },
  {
    id: "route-6",
    name: "Middle East Gateway (MEG)",
    origin: AEJEA,
    destination: SGPIN,
    pathD: generatePathD(AEJEA, SGPIN),
    status: "Under Review",
    vessel: "ONE Stork",
    progress: 15,
  },
  {
    id: "route-7",
    name: "North Atlantic Corridor (NAC)",
    origin: NLRTM,
    destination: USNYC,
    pathD: generatePathD(NLRTM, USNYC),
    status: "On Schedule",
    vessel: "Ever Given",
    progress: 72,
  },
  {
    id: "route-8",
    name: "Japan Transpacific (JTX)",
    origin: JPYOK,
    destination: USLGB,
    pathD: generatePathD(JPYOK, USLGB),
    status: "On Schedule",
    vessel: "ONE Apus",
    progress: 88,
  },
  {
    id: "route-9",
    name: "China Coastal Relay (CCR)",
    origin: CNNGB,
    destination: SGPIN,
    pathD: generatePathD(CNNGB, SGPIN),
    status: "Delayed",
    vessel: "Cosco Shipping Universe",
    progress: 33,
  },
];

// High-fidelity fallback data in case of network outages or API limits
export const MOCK_WEATHER: Record<string, any> = {
  Rotterdam: {
    main: { temp: 15.4, humidity: 78, pressure: 1014 },
    wind: { speed: 7.2, deg: 240 },
    weather: [{ description: "broken clouds", icon: "04d" }],
    coord: { lat: 51.92, lon: 4.47 },
  },
  "Los Angeles": {
    main: { temp: 22.8, humidity: 55, pressure: 1016 },
    wind: { speed: 4.1, deg: 180 },
    weather: [{ description: "clear sky", icon: "01d" }],
    coord: { lat: 33.74, lon: -118.26 },
  },
  Singapore: {
    main: { temp: 29.5, humidity: 82, pressure: 1008 },
    wind: { speed: 3.5, deg: 90 },
    weather: [{ description: "thunderstorm with light rain", icon: "11d" }],
    coord: { lat: 1.35, lon: 103.81 },
  },
  Hamburg: {
    main: { temp: 12.1, humidity: 71, pressure: 1018 },
    wind: { speed: 5.8, deg: 260 },
    weather: [{ description: "light rain", icon: "10d" }],
    coord: { lat: 53.55, lon: 9.97 },
  },
  Busan: {
    main: { temp: 23.4, humidity: 68, pressure: 1012 },
    wind: { speed: 4.2, deg: 140 },
    weather: [{ description: "partly cloudy", icon: "02d" }],
    coord: { lat: 35.10, lon: 129.04 },
  },
  Shenzhen: {
    main: { temp: 28.9, humidity: 85, pressure: 1006 },
    wind: { speed: 2.1, deg: 180 },
    weather: [{ description: "haze", icon: "50d" }],
    coord: { lat: 22.54, lon: 113.96 },
  },
  "Jebel Ali": {
    main: { temp: 36.2, humidity: 45, pressure: 1004 },
    wind: { speed: 3.8, deg: 310 },
    weather: [{ description: "clear sky", icon: "01d" }],
    coord: { lat: 25.01, lon: 55.06 },
  },
  "New York": {
    main: { temp: 20.1, humidity: 62, pressure: 1016 },
    wind: { speed: 5.2, deg: 200 },
    weather: [{ description: "few clouds", icon: "02d" }],
    coord: { lat: 40.71, lon: -74.01 },
  },
};

export const MOCK_COUNTRIES: Record<string, any> = {
  CN: {
    name: { common: "China", official: "People's Republic of China" },
    flags: { svg: "https://flagcdn.com/cn.svg", png: "https://flagcdn.com/w320/cn.png" },
    currencies: { CNY: { name: "Chinese Yuan", symbol: "¥" } },
    languages: { zho: "Chinese" },
    population: 1411778724,
  },
  NL: {
    name: { common: "Netherlands", official: "Kingdom of the Netherlands" },
    flags: { svg: "https://flagcdn.com/nl.svg", png: "https://flagcdn.com/w320/nl.png" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { nld: "Dutch" },
    population: 17590672,
  },
  SG: {
    name: { common: "Singapore", official: "Republic of Singapore" },
    flags: { svg: "https://flagcdn.com/sg.svg", png: "https://flagcdn.com/w320/sg.png" },
    currencies: { SGD: { name: "Singapore Dollar", symbol: "S$" } },
    languages: { eng: "English", zho: "Chinese", msa: "Malay", tam: "Tamil" },
    population: 5685800,
  },
  US: {
    name: { common: "United States", official: "United States of America" },
    flags: { svg: "https://flagcdn.com/us.svg", png: "https://flagcdn.com/w320/us.png" },
    currencies: { USD: { name: "United States Dollar", symbol: "$" } },
    languages: { eng: "English" },
    population: 331449281,
  },
  DE: {
    name: { common: "Germany", official: "Federal Republic of Germany" },
    flags: { svg: "https://flagcdn.com/de.svg", png: "https://flagcdn.com/w320/de.png" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { deu: "German" },
    population: 83166711,
  },
  KR: {
    name: { common: "South Korea", official: "Republic of Korea" },
    flags: { svg: "https://flagcdn.com/kr.svg", png: "https://flagcdn.com/w320/kr.png" },
    currencies: { KRW: { name: "South Korean Won", symbol: "₩" } },
    languages: { kor: "Korean" },
    population: 51784059,
  },
  AE: {
    name: { common: "UAE", official: "United Arab Emirates" },
    flags: { svg: "https://flagcdn.com/ae.svg", png: "https://flagcdn.com/w320/ae.png" },
    currencies: { AED: { name: "UAE Dirham", symbol: "د.إ" } },
    languages: { ara: "Arabic" },
    population: 9890400,
  },
  JP: {
    name: { common: "Japan", official: "Japan" },
    flags: { svg: "https://flagcdn.com/jp.svg", png: "https://flagcdn.com/w320/jp.png" },
    currencies: { JPY: { name: "Japanese Yen", symbol: "¥" } },
    languages: { jpn: "Japanese" },
    population: 125124989,
  },
};

export const MOCK_EXCHANGE_RATES = {
  bitcoin: { usd: 96420 },
  ethereum: { usd: 3410 },
  "usd-coin": { usd: 1.0 },
};
