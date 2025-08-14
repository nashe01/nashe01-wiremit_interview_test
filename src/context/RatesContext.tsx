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
      
      // Transform the data to our format - assuming the API returns rates object
      const transformedRates: ExchangeRate[] = [
        { currency: 'GBP', rate: data.GBP || 0.8, symbol: '£' },
        { currency: 'EUR', rate: data.EUR || 0.85, symbol: '€' },
        { currency: 'ZAR', rate: data.ZAR || 18.5, symbol: 'R' }
      ];
      
      setRates(transformedRates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rates');
      // Fallback rates if API fails
      setRates([
        { currency: 'GBP', rate: 0.8, symbol: '£' },
        { currency: 'EUR', rate: 0.85, symbol: '€' },
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