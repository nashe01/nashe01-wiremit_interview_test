import React, { createContext, useContext, useState, useEffect } from 'react';

interface ExchangeRate {
  currency: string;
  rate: number;
  symbol: string;
}

interface RatesContextType {
  rates: ExchangeRate[];
  loading: boolean;
  error: string | null;
  refreshRates: () => void;
  getRate: (currency: string) => number;
}

const RatesContext = createContext<RatesContextType | undefined>(undefined);

export const useRates = () => {
  const context = useContext(RatesContext);
  if (context === undefined) {
    throw new Error('useRates must be used within a RatesProvider');
  }
  return context;
};

export const RatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS');
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      
      const data = await response.json();

      // API returns array like: [{ "USD": 1 }, { "GBP": 0.74 }, { "ZAR": 17.75 }]
      // Step 1: Normalize to flat object
      const normalizedRates: Record<string, number> = Array.isArray(data)
        ? data.reduce((acc: Record<string, number>, item: Record<string, number>) => {
            const currency = Object.keys(item)[0];
            acc[currency] = Number(item[currency]);
            return acc;
          }, {})
        : (data as Record<string, number>);

      // Step 2: Extract ONLY supported currencies (GBP and ZAR)
      const transformedRates: ExchangeRate[] = [
        {
          currency: 'GBP',
          rate: normalizedRates['GBP'] ?? 0.8,
          symbol: '£'
        },
        {
          currency: 'ZAR',
          rate: normalizedRates['ZAR'] ?? 18.5,
          symbol: 'R'
        }
      ];

      setRates(transformedRates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rates');
      // Fallback rates if API fails (supported currencies only)
      setRates([
        { currency: 'GBP', rate: 0.8, symbol: '£' },
        { currency: 'ZAR', rate: 18.5, symbol: 'R' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const refreshRates = () => {
    fetchRates();
  };

  const getRate = (currency: string): number => {
    const rate = rates.find(r => r.currency === currency);
    return rate ? rate.rate : 1;
  };

  const value = {
    rates,
    loading,
    error,
    refreshRates,
    getRate
  };

  return <RatesContext.Provider value={value}>{children}</RatesContext.Provider>;
};