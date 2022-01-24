import * as React from 'react';
import { FC, useCallback, useContext, useState } from 'react';
import { MetricsAPI } from './api';

type Price = {
  price: number;
  time: string;
}

type Metrics = {
  chsbCirculatingSupplyTokens: number;
  chsbStackedTokens: number;
  chsbStackedPercentage: number;
  chsbYieldPledgedTokens: number;
  chsbInYieldPercentage: number;
  chsbBurnedTokens: number;
  totalSupplyBurnedPercentage: number;
}

type MetricsContextType = {
  dailyPrice?: Price[];
  metrics?: Metrics,
  getDailyPrice: any;
  getMetrics: any;
};

const initialValue = {
  dailyPrice: undefined,
  metrics: undefined,
};

const MetricsContext = React.createContext<MetricsContextType | null>(null);

const MetricsProvider: FC = ({ children }) => {
  const [dailyPrice, setDailyPrice] = useState<Price[]>();
  const [metrics, setMetrics] = useState<Metrics>();

  const getDailyPrice = useCallback(async () => {
    const data = await MetricsAPI.getDailyPrice();

    setDailyPrice(data);
    return data;

  }, []);

  const getMetrics = useCallback(async () => {
    const data = await MetricsAPI.getMetrics();
    setMetrics(data);
    return data;
  }, []);

  return (
    <MetricsContext.Provider value={{
      dailyPrice,
      metrics,
      getDailyPrice,
      getMetrics
    }
    }>
      {children}
    </MetricsContext.Provider>
  );
}

const useMetrics = () => useContext(MetricsContext)!;

export type {
  Metrics,
  Price,
}

export {
  MetricsProvider,
  useMetrics,
};
