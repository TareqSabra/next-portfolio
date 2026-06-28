import apiClient from "./apiClient";

export const getCountry = async (code: string) => {
  const { data } = await apiClient.get("/dashboard/api/country", {
    params: { code },
  });
  return data;
};

/**
 * Fetch destination port weather by city name from OpenWeather API
 * @param city City name (e.g., 'Rotterdam', 'Los Angeles')
 */
export const getWeather = async (city: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";
  const queryCity = city === "Los Angeles" ? "Los Angeles,US" : city;
  const { data } = await apiClient.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        q: queryCity,
        appid: apiKey,
        units: "metric",
      },
    }
  );
  return data;
};

/**
 * Fetch cryptocurrency rates in USD from CoinGecko simple price API
 */
export const getExchangeRates = async () => {
  const { data } = await apiClient.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: "bitcoin,ethereum,usd-coin",
        vs_currencies: "usd",
      },
    }
  );
  return data;
};
