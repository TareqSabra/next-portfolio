export const INSURANCE_FEE = 250;
export const CUSTOMS_FEE = 150;

export const FALLBACK_RATES = {
  bitcoin: { usd: 90000 },
  ethereum: { usd: 3200 },
  "usd-coin": { usd: 1 },
  eur: 0.92,
};

export const CURRENCY_CONFIG: Record<string, { symbol: string }> = {
  EUR: { symbol: "€" },
  SGD: { symbol: "S$" },
  CNY: { symbol: "¥" },
  USD: { symbol: "$" },
};
