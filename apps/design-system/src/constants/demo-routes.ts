import { projectPorts, portMap, generatePathD } from "@portfolio/ui";

export const DEMO_PORTS = projectPorts();
export const DEMO_PORT_MAP = portMap(DEMO_PORTS);
export const DEMO_ROUTES = [
  {
    id: "route-1",
    name: "Asia-Europe Express",
    origin: DEMO_PORT_MAP.CNSHA,
    destination: DEMO_PORT_MAP.NLRTM,
    pathD: generatePathD(DEMO_PORT_MAP.CNSHA, DEMO_PORT_MAP.NLRTM, DEMO_PORT_MAP.SGPIN),
    vessel: "Cosco Taurus",
    progress: 65,
  },
  {
    id: "route-2",
    name: "Transpacific Eastbound",
    origin: DEMO_PORT_MAP.SGPIN,
    destination: DEMO_PORT_MAP.USLAX,
    pathD: generatePathD(DEMO_PORT_MAP.SGPIN, DEMO_PORT_MAP.USLAX),
    vessel: "Maersk McKinney",
    progress: 40,
  },
  {
    id: "route-3",
    name: "Transatlantic Bridge",
    origin: DEMO_PORT_MAP.NLRTM,
    destination: DEMO_PORT_MAP.USLAX,
    pathD: generatePathD(DEMO_PORT_MAP.NLRTM, DEMO_PORT_MAP.USLAX),
    vessel: "CMA CGM Antoine",
    progress: 80,
  },
];
