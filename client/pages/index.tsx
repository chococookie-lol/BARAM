import Logo from '../components/Logo';
import { css } from '@emotion/react';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';

const style = {
  verticalCenter: css`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding-bottom: 25px;
  `,
  container: css`
    width: 100%;
    height: 900px;
    position: relative;
  `,
  center: css`
    position: relative;
    top: 40%;
    left: 0;
    transform: translate(0, -50%);
  `,
};

const openGraph: OpenGraph = {
  url: 'https://baram.ga',
  type: 'website',
  siteName: 'BARAM',
  title: 'BARAM',
  description: '칼바람 나락 전적검색 - BARAM',
  images: [
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/BARAM.png` ?? '',
      width: 250,
      height: 234,
      alt: 'BARAM',
      type: 'image/png',
    },
  ],
};

export default function Home() {
  const [summonerName, setSummonerName] = useState<string>('');
  const router = useRouter();

  return (
    <>
      <NextSeo openGraph={openGraph} />
      <div css={style.container}>
        <div css={style.center}>
          <div css={style.verticalCenter}>
            <Logo width={500} />
          </div>
          <div css={style.verticalCenter}>
            <SearchBar
              text={summonerName}
              setText={setSummonerName}
              onSearchButtonClick={() => {
                if (summonerName === '') return;

                router.push(`/summoners/${summonerName}`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
