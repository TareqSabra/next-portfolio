import { useQuery } from "@tanstack/react-query";
import { getCountry, getWeather, getExchangeRates } from "../services/api";
import { MOCK_COUNTRIES, MOCK_WEATHER, MOCK_EXCHANGE_RATES } from "../constants";

/**
 * Custom hook to fetch country profiles with robust fallback mock data.
 * @param code Country alpha-2 code (e.g. 'NL', 'CN')
 */
export function useCountry(code: string) {
  const query = useQuery({
    queryKey: ["country", code],
    queryFn: () => getCountry(code),
    retry: 1,
    staleTime: 1000 * 60 * 30, // 30 minutes cache for static countries data
  });

  const activeData = query.isError || !query.data ? MOCK_COUNTRIES[code] : query.data;

  return {
    ...query,
    activeData,
  };
}

/**
 * Custom hook to fetch port weather with robust fallback mock data.
 * @param city Port city name (e.g. 'Rotterdam', 'Los Angeles')
 */
export function useWeather(city: string) {
  const query = useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
    retry: 1,
    refetchInterval: 1000 * 60 * 5, // auto-refresh weather every 5 mins
  });

  const activeData = query.isError || !query.data ? MOCK_WEATHER[city] : query.data;

  return {
    ...query,
    activeData,
  };
}

/**
 * Custom hook to fetch cryptocurrency exchange rates with robust fallback mock data.
 */
export function useExchangeRates() {
  const query = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: getExchangeRates,
    retry: 1,
    refetchInterval: 1000 * 60 * 10, // auto-refresh crypto rates every 10 mins
  });

  const activeData = query.isError || !query.data ? MOCK_EXCHANGE_RATES : query.data;

  return {
    ...query,
    activeData,
  };
}
