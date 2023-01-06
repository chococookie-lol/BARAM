import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameSlot from '../../components/GameSlot';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import SummonerProfileCard from '../../components/SummonerProfileCard';
import SummonerStatCard from '../../components/SummonerStatCard';
import { getMatch, getSummonerMatchIds, getSummonerProfile } from '../../utils/api';

const style = {
  header: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 128px;
    padding-top: 24px;
    padding-bottom: 24px;
  `,
  aside: css`
    position: relative;
    left: calc(50% - 370px);
    top: 0;
    height: 400px;
    width: 265px;
    transform: translate(-100%);
    padding-right: 24px;
  `,
  profile: css`
    display: flex;
    justify-content: space-between;
    width: calc(265px + 777px + 24px);
    margin: auto;
    transform: translate(-144px);
  `,
  textAlignCenter: css`
    text-align: center;
  `,
  main: css`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > * {
      margin: 10px 0;
    }
  `,
};

export default function SearchPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const [summonerName, setSummonerName] = useState<string | null>(null);
  const [summonerProfile, setSummonerProfile] = useState<SummonerProfile | null>(null);
  const [matchIds, setMatchIds] = useState<SummonerMatchIds>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const handleSearch = () => {
    if (searchText === '') return;

    router.push(`/summoners/${searchText}`);
  };

  useEffect(() => {
    const query = router.query;
    if (typeof query.summonerName === 'string') {
      setSummonerName(query.summonerName);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (summonerName === null) return;

    (async () => {
      try {
        setSummonerProfile(await getSummonerProfile(summonerName));
        setMatchIds((await getSummonerMatchIds(summonerName)).matchIds);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [summonerName]);

  useEffect(() => {
    const promises = matchIds.map((matchId) => getMatch(matchId));

    (async () => {
      try {
        setMatches(await Promise.all(promises));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [matchIds]);

  if (!summonerName || !summonerProfile) {
    return (
      <>
        <header css={style.header}>
          <Logo width={221} />
          <SearchBar text={searchText} setText={setSearchText} onSearchButtonClick={handleSearch} />
        </header>
        <p css={style.textAlignCenter}>Loading...</p>
      </>
    );
  }

  return (
    <>
      <header css={style.header}>
        <Logo width={221} />
        <SearchBar text={searchText} setText={setSearchText} onSearchButtonClick={handleSearch} />
      </header>
      <div css={style.profile}>
        <SummonerProfileCard
          profileIconId={summonerProfile.profileIconId}
          summonerName={summonerName}
          summonerLevel={summonerProfile.level}
          modifiedAt={summonerProfile.lastModified}
          challenges={summonerProfile.challenges}
        />
        <SummonerStatCard
          winRate={{ win: 11, lose: 9 }}
          kda={{ kill: 11, death: 9, assist: 14, killContribution: 0.4 }}
          camp={{ blue: 8, red: 12 }}
          gameContribution={{
            dealt: 0.4,
            dealtAmount: 3214,
            heal: 0.1,
            healAmount: 123,
            death: 0.3,
            deathAmount: 6,
            damaged: 0.4,
            damagedAmount: 1234,
            place: 3,
          }}
        />
      </div>
      <main css={style.main}>
        {matches.map((match, idx) => (
          <GameSlot
            key={`gameSlot-${match.info.gameId}-${idx}`}
            matchData={match}
            puuid={summonerProfile.puuid}
          />
        ))}
      </main>
    </>
  );
}
