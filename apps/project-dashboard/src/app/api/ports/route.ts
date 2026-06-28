import { NextResponse } from "next/server";
import { ALL_PORTS } from "@/lib/ports";
import { project } from "@/lib/projection";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const minLon = searchParams.get("minLon");
  const maxLon = searchParams.get("maxLon");
  const minLat = searchParams.get("minLat");
  const maxLat = searchParams.get("maxLat");

  let filtered = ALL_PORTS;

  if (code) {
    const upper = code.toUpperCase();
    filtered = filtered.filter(
      (p) => p.code === upper || p.id === upper || p.countryCode === upper,
    );
  }

  if (minLon) filtered = filtered.filter((p) => p.lon >= parseFloat(minLon));
  if (maxLon) filtered = filtered.filter((p) => p.lon <= parseFloat(maxLon));
  if (minLat) filtered = filtered.filter((p) => p.lat >= parseFloat(minLat));
  if (maxLat) filtered = filtered.filter((p) => p.lat <= parseFloat(maxLat));

  const ports = filtered.map((p) => {
    const { x, y } = project(p.lon, p.lat);
    return { ...p, x, y };
  });

  return NextResponse.json({ ports });
}
