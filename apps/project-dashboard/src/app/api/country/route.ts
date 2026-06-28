import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing country code" }, { status: 400 });
  }

  // Load API key from server environment (secure, not exposed to browser!)
  const apiKey = process.env.REST_COUNTRIES_API_KEY || "rc_live_24c5ffdc20844da68782846f51048715";

  const nameMap: Record<string, string> = {
    CN: "china",
    NL: "netherlands",
    SG: "singapore",
    US: "united states",
  };

  const queryName = nameMap[code.toUpperCase()] || code;

  try {
    const { data } = await axios.get(
      "https://api.restcountries.com/countries/v5",
      {
        params: {
          q: queryName,
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const objects = data?.data?.objects || [];
    const exactMatch = objects.find(
      (obj: any) => obj?.codes?.alpha_2 === code.toUpperCase()
    );

    if (!exactMatch) {
      return NextResponse.json({ error: `Country ${code} not found` }, { status: 404 });
    }

    // Map premium response schema to client schema
    const mappedCurrencies: Record<string, { name: string; symbol: string }> = {};
    if (Array.isArray(exactMatch.currencies)) {
      exactMatch.currencies.forEach((curr: any) => {
        if (curr.code) {
          mappedCurrencies[curr.code] = {
            name: curr.name || "",
            symbol: curr.symbol || "",
          };
        }
      });
    }

    const mappedLanguages: Record<string, string> = {};
    if (Array.isArray(exactMatch.languages)) {
      exactMatch.languages.forEach((lang: any) => {
        const key = lang.iso639_2t || lang.iso639_1 || lang.bcp47 || "eng";
        mappedLanguages[key] = lang.name || "";
      });
    }

    const mappedData = {
      name: {
        common: exactMatch.names?.common || "",
        official: exactMatch.names?.official || "",
      },
      flags: {
        png: exactMatch.flag?.url_png || "",
        svg: exactMatch.flag?.url_svg || "",
      },
      population: exactMatch.population || 0,
      currencies: mappedCurrencies,
      languages: mappedLanguages,
    };

    return NextResponse.json(mappedData);
  } catch (error: any) {
    console.error("[Country API Route Error]:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch country data", details: error.message },
      { status: 500 }
    );
  }
}
