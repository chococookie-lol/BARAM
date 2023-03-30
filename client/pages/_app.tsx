import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalThemeProvider from '../styles/GlobalThemeContext';
import { RecoilRoot } from 'recoil';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>칼바람 나락 전적검색 BARAM</title>
      </Head>
      <GlobalThemeProvider>
        <RecoilRoot>
          <Component {...pageProps} />
          <Footer />
        </RecoilRoot>
      </GlobalThemeProvider>
    </>
  );
}
