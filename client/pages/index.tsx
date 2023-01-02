import Logo from '../components/Logo';
import { css } from '@emotion/react';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
    height: 100%;
    position: relative;
  `,
  center: css`
    position: relative;
    top: 40%;
    left: 0;
    transform: translate(0, -50%);
  `,
};

export default function Home() {
  const [summonerName, setSummonerName] = useState<string>('');
  const router = useRouter();

  return (
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
  );
}
