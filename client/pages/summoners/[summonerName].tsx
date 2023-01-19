import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import GameSlot from '../../components/GameSlot';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import SummonerProfileCard from '../../components/SummonerProfileCard';
import SummonerStatCard from '../../components/SummonerStatCard';
import {
  getMatch,
  getSummonerMatchIds,
  getSummonerProfile,
  requestFetchSummonerMatches,
  tryToGetSummonerProfile,
} from '../../utils/api';
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
    width: 777px;
    display: block;
    position: relative;
    margin: 0 auto;
    & > * {
      margin: 10px 0 0 0;
    }
  `,
};

const defaultTotalStatistics = getTotalMatchStatistics({});

interface SummonerProfilePanelProps {
  summonerName: string;
}

function SummonerProfilePanel({ summonerName }: SummonerProfilePanelProps) {
  const [summonerProfile, setSummonerProfile] = useState<SummonerProfile | null>(null);
  const [matchIds, setMatchIds] = useState<SummonerMatchIds>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchStatistics, setMatchStatistics] = useState<{ [key: string]: MatchStatistic }>({});
  const [totalStatistics, setTotalStatistics] = useState<TotalStatistic | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    async function tick() {
      const newSummonerProfile = await getSummonerProfile(summonerName);
      if (!newSummonerProfile.isFetching) {
        setSummonerProfile(newSummonerProfile);
        const lastMatchId = matches.length ? matches[matches.length - 1].info.gameId : 0;

        const newMatchIds = (
          await getSummonerMatchIds(newSummonerProfile.puuid, lastMatchId)
        ).matchIds.filter((id) => matchIds.indexOf(id) === -1);

        setMatchIds(newMatchIds);
        setLoadMore(false);
      }
    }

    if (loadMore) {
      const timer = setInterval(tick, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [loadMore, summonerName, matchIds, matches]);

  useEffect(() => {
    async function tick() {
      const newSummonerProfile = await getSummonerProfile(summonerName);
      if (!newSummonerProfile.isFetching) {
        setSummonerProfile(newSummonerProfile);
        setMatches([]);
        setMatchIds((await getSummonerMatchIds(newSummonerProfile.puuid)).matchIds);
        setUpdate(false);
      }
    }

    if (update) {
      const timer = setInterval(tick, 1000);
      return () => clearInterval(timer);
    }
  }, [update, summonerName]);

  // on summoner change
  useEffect(() => {
    // reset previous summoner data
    setUpdate(false);
    setLoadMore(false);
    setFetching(false);
    setTotalStatistics(defaultTotalStatistics);
    setSummonerProfile(null);
    setMatchIds([]);
    setMatches([]);
    setMatchStatistics({});

    if (!summonerName) return;

    (async () => {
      try {
        const newSummonerProfile = await tryToGetSummonerProfile(summonerName);
        setSummonerProfile(newSummonerProfile);
        setMatchIds((await getSummonerMatchIds(newSummonerProfile.puuid)).matchIds);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [summonerName]);

  useEffect(() => {
    if (matchIds.length === 0) return;

    const promises = matchIds.map((matchId) => getMatch(matchId));
    (async () => {
      try {
        const newMatches = await Promise.all(promises);
        setMatches((matches) => [...matches, ...newMatches]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [matchIds]);

  useEffect(() => {
    if (!summonerProfile || matches.length === 0) return;

    // sort
    matches.sort((a: Match, b: Match) => {
      return a.info.gameCreation < b.info.gameCreation ? 1 : -1;
    });

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
    setFetching(false);
  }, [matchStatistics]);

  // before loading router
  if (!summonerName) return <></>;

  // before fetching summoner info
  if (!summonerProfile || !totalStatistics) return <p css={style.textAlignCenter}>...</p>;

  const { winRate, kda, camp, gameContribution } = totalStatistics;

  return (
    <>
      <div css={style.profile}>
        <SummonerProfileCard
          profileIconId={summonerProfile.profileIconId}
          summonerName={summonerName}
          summonerLevel={summonerProfile.level}
          modifiedAt={new Date(summonerProfile.updatedAt).getTime()}
          challenges={summonerProfile.challenges}
          onClick={async () => {
            try {
              setFetching(true);
              await requestFetchSummonerMatches(summonerProfile.puuid);
              setUpdate(true);
            } catch (e) {
              console.error(e);
              setUpdate(false);
              setFetching(false);
            }
          }}
          fetching={fetching}
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
        {matches.length !== 0 && (
          <Button
            width={'100%'}
            enabled={!fetching}
            onClick={async () => {
              try {
                setFetching(true);
                await requestFetchSummonerMatches(
                  summonerProfile.puuid,
                  Math.floor(matches[matches.length - 1].info.gameCreation / 1000),
                );
                setLoadMore(true);
              } catch (e) {
                console.error(e);
                setLoadMore(false);
                setFetching(false);
              }
            }}
          >
            {fetching ? '...' : '더보기'}
          </Button>
        )}
      </main>
    </>
  );
}

export default function SearchPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const [summonerName, setSummonerName] = useState<string>('');

  const handleSearch = () => {
    if (searchText === '') return;
    router.push(`/summoners/${searchText}`);
  };

  useEffect(() => {
    const query = router.query;
    if (typeof query.summonerName === 'string') {
      setSummonerName(query.summonerName);
      setSearchText(query.summonerName);
    }
  }, [router.isReady, router.query]);
  return (
    <>
      <header css={style.header}>
        <Logo width={221} />
        <SearchBar text={searchText} setText={setSearchText} onSearchButtonClick={handleSearch} />
      </header>
      <SummonerProfilePanel summonerName={summonerName} />
    </>
  );
}
