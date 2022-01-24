import 'styles/theme.css'
import type { AppProps } from 'next/app'
import { MetricsProvider } from 'src/metrics';

const App = ({ Component, pageProps }: AppProps) => (
  <MetricsProvider>
    <Component {...pageProps} />
  </MetricsProvider>
);

export default App;
