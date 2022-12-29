import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalThemeProvider from '../styles/GlobalThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalThemeProvider>
      <Component {...pageProps} />
    </GlobalThemeProvider>
  );
}
