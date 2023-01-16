import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameSlot from '../../components/GameSlot';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import SummonerProfileCard from '../../components/SummonerProfileCard';
import SummonerStatCard from '../../components/SummonerStatCard';
import { getMatch, getSummonerMatchIds, getSummonerProfile } from '../../utils/api';
import {
  getMatchStatistic,
  getTotalMatchStatistics,
  MatchStatistic,
  TotalStatistic,
} from '../../utils/matchStatistic';

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
  const [matchStatistics, setMatchStatistics] = useState<{ [key: string]: MatchStatistic } | null>(
    null,
  );
  const [totalStatistics, setTotalStatistics] = useState<TotalStatistic | null>(null);

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
      } catch (e) {
        console.error(e);
      }
    })();
  }, [summonerName]);

  useEffect(() => {
    if (summonerProfile === null) return;

    (async () => {
      try {
        setMatchIds((await getSummonerMatchIds(summonerProfile.puuid)).matchIds);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [summonerProfile]);

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

  useEffect(() => {
    if (!summonerProfile) return;
    if (matches.length === 0) return;

    setMatchStatistics(
      matches.reduce((acc, match) => {
        const newAcc: { [index: string]: MatchStatistic } = { ...acc };
        if (newAcc[match.metadata.matchId]) return newAcc;

        newAcc[match.metadata.matchId] = getMatchStatistic(match, summonerProfile?.puuid);
        return newAcc;
      }, {}),
    );
  }, [matches, summonerProfile]);

  useEffect(() => {
    if (matchStatistics) {
      setTotalStatistics(getTotalMatchStatistics(matchStatistics));
    }
  }, [matchStatistics]);

  if (!summonerName || !summonerProfile || !totalStatistics) {
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

  const { winRate, kda, camp, gameContribution } = totalStatistics;

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
          modifiedAt={new Date(summonerProfile.updatedAt).getTime()}
          challenges={summonerProfile.challenges}
        />
        <SummonerStatCard
          winRate={winRate}
          kda={kda}
          camp={camp}
          gameContribution={gameContribution}
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
