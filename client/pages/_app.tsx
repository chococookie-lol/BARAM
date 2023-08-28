import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Footer from '../components/Footer';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import useTheme from '../styles/useTheme';
import { THEME } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [theme] = useTheme();

  return (
    <>
      <Head>
        <title>칼바람 나락 전적검색 BARAM</title>
      </Head>
      <ThemeProvider theme={THEME[theme]}>
        <RecoilRoot>
          <Component {...pageProps} />
          <Footer />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}
