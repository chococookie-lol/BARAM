import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalThemeProvider from '../styles/GlobalThemeContext';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalThemeProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </GlobalThemeProvider>
  );
}
