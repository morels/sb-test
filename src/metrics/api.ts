import { DailyPrice, Metrics } from "./metrics";

export const MetricsAPI: {
  getMetrics: () => Promise<Metrics>;
  getDailyPrice: () => Promise<DailyPrice>
} = {
  getMetrics: () => fetch(`${process.env.NEXT_PUBLIC_HOST}/chsb-metrics`).then(res => res.json()),
  getDailyPrice: () => fetch(`${process.env.NEXT_PUBLIC_HOST}/chsb-price-day`).then(res => res.json()),
};
