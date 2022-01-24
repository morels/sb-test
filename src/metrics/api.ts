export const MetricsAPI = {
  getMetrics: () => fetch(`${process.env.NEXT_PUBLIC_HOST}/chsb-metrics`).then(res => res.json()),
  getDailyPrice: () => fetch(`${process.env.NEXT_PUBLIC_HOST}/chsb-price-day`).then(res => res.json()),
};
