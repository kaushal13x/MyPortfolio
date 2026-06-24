import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData as localData } from '../data/portfolio';

// Define the shape of our context
interface PortfolioContextType {
  data: typeof localData;
  loading: boolean;
  error: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<typeof localData>(localData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/portfolio`);
        if (!response.ok) {
          throw new Error('Failed to fetch from API');
        }
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        console.warn('Backend API unavailable. Falling back to local data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
