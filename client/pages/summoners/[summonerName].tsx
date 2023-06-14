import { css } from '@emotion/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from '../../components/Button';
import GameSlot from '../../components/GameSlot';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import SummonerProfileCard from '../../components/SummonerProfileCard';
import SummonerStatCard from '../../components/SummonerStatCard';
import {
  getMatch,
  getScoreMultipliers,
  getSummonerMatchIds,
  getSummonerProfile,
  requestFetchSummonerMatches,
  tryToGetSummonerProfile,
} from '../../utils/api';
import { getUsersFromLocalStorage, setUsersToLocalStorage } from '../../utils/localStorage';
import {
  calculateContributionRanks,
  getMatchStatistic,
  getTotalMatchStatistics,
  MatchStatistic,
  TotalStatistic,
} from '../../utils/matchStatistic';

const defaultTotalStatistics = getTotalMatchStatistics({});

interface SummonerProfilePanelProps {
  summonerName: string;
  setSummonerNotFound: Dispatch<SetStateAction<boolean>>;
}

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
  summonerNotFound: css`
    font-size: 20px;
    text-align: center;
  `,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { summonerName } = context.query;

  return {
    props: {
      name: summonerName,
    },
  };
};

interface SearchPageProps {
  name: string;
}

export default function SearchPage({ name }: SearchPageProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const [summonerName, setSummonerName] = useState<string>('');
  const [summonerNotFound, setSummonerNotFound] = useState<boolean>(false);

  const openGraph: OpenGraph = {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${name}`,
    type: 'website',
    siteName: 'BARAM',
    title: 'BARAM',
    description: `${name} 게임 전적 - BARAM`,
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

  // to save recent search user data
  useEffect(() => {
    const users = getUsersFromLocalStorage();
    const oldUser = users.find((user) => user.userName === name);
    const newUser: SavedUser = {
      userName: name,
      isStarred: oldUser?.isStarred ?? false,
    };

    if (oldUser !== undefined) {
      setUsersToLocalStorage([newUser, ...users.filter((user) => user.userName !== name)]);
    } else {
      const starredUsers = users.filter((user) => user.isStarred);
      const nonStarredUsers = [newUser, ...users.filter((user) => !user.isStarred)];
      setUsersToLocalStorage([...starredUsers, ...nonStarredUsers.slice(0, 5)]);
    }
  }, [name]);

  const handleSearch = () => {
    if (searchText === '') return;
    setSummonerNotFound(false);
    setSummonerName('');
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
      <NextSeo openGraph={openGraph} />
      <header css={style.header}>
        <Logo width={221} />
        <SearchBar text={searchText} setText={setSearchText} onSearchButtonClick={handleSearch} />
      </header>
      {summonerNotFound ? (
        <p css={style.summonerNotFound}>소환사가 없습니다.</p>
      ) : (
        <SummonerProfilePanel
          summonerName={summonerName}
          setSummonerNotFound={setSummonerNotFound}
        />
      )}
    </>
  );
}

function SummonerProfilePanel({ summonerName, setSummonerNotFound }: SummonerProfilePanelProps) {
  const [summonerProfile, setSummonerProfile] = useState<SummonerProfile | null>(null);
  const [matchIds, setMatchIds] = useState<SummonerMatchIds>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchStatistics, setMatchStatistics] = useState<{ [key: string]: MatchStatistic }>({});
  const [totalStatistics, setTotalStatistics] = useState<TotalStatistic | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [pollStart, setPollStart] = useState<Date | null>(null);
  const [loadMore, setLoadMore] = useState<number | null>(null);
  const [update, setUpdate] = useState<number | null>(null);
  const [scoreMultipliers, setScoreMultipliers] = useState<Contribution | null>(null);

  useEffect(() => {
    async function tick() {
      const newSummonerProfile = await getSummonerProfile(summonerName);
      if (pollStart != newSummonerProfile.updatedAt) {
        setSummonerProfile(newSummonerProfile);
        const lastMatchId = matches.length ? matches[matches.length - 1].info.gameId : 0;

        const newMatchIds = (
          await getSummonerMatchIds(newSummonerProfile.puuid, lastMatchId)
        ).matchIds.filter((id) => matchIds.indexOf(id) === -1);

        setMatchIds(newMatchIds);
        setLoadMore(null);
      } else if (loadMore !== null) setLoadMore(loadMore + 1);
    }

    if (loadMore !== null) {
      const timer = setTimeout(tick, 1000);
      return () => clearTimeout(timer);
    }
  }, [loadMore, summonerName, matchIds, matches, pollStart]);

  useEffect(() => {
    async function tick() {
      const newSummonerProfile = await getSummonerProfile(summonerName);
      if (pollStart != newSummonerProfile.updatedAt) {
        setSummonerProfile(newSummonerProfile);
        setMatches([]);
        setMatchIds((await getSummonerMatchIds(newSummonerProfile.puuid)).matchIds);
        setUpdate(null);
      } else if (update !== null) setUpdate(update + 1);
    }

    if (update !== null) {
      const timer = setTimeout(tick, 1000);
      return () => clearTimeout(timer);
    }
  }, [update, summonerName, pollStart]);

  // on summoner change
  useEffect(() => {
    // reset previous summoner data
    setFetching(false);
    setUpdate(null);
    setLoadMore(null);
    setPollStart(null);
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
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === axios.HttpStatusCode.NotFound) {
          setSummonerNotFound(true);
        }
      }
    })();

    (async () => {
      setScoreMultipliers(await getScoreMultipliers());
    })();
  }, [setSummonerNotFound, summonerName]);

  useEffect(() => {
    if (matchIds.length === 0 || !scoreMultipliers) return;

    const promises = matchIds.map(async (matchId) => {
      const match = await getMatch(matchId);
      calculateContributionRanks(match, scoreMultipliers);
      return match;
    });

    (async () => {
      try {
        const newMatches = await Promise.all(promises);
        setMatches((matches) => [...matches, ...newMatches]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [matchIds, scoreMultipliers]);

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
    setPollStart(null);
    setFetching(false);
  }, [matchStatistics]);

  // before loading router
  if (!summonerName) return <></>;

  // before fetching summoner info
  if (!summonerProfile || !totalStatistics) return <p css={style.textAlignCenter}>...</p>;

  const { winRate, kda, camp, gameContribution } = totalStatistics;

  const onUpdate = () => {
    setFetching(true);
    (async () => {
      try {
        setPollStart((await requestFetchSummonerMatches(summonerProfile.puuid)).startedAt);
        setUpdate(0);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 503) {
            alert('현재 Riot API가 동작하지 않습니다. 다음에 다시 시도해 주세요.');
          } else {
            alert(e.response?.data.message);
          }
        }
        console.error(e);
        setUpdate(null);
        setPollStart(null);
        setFetching(false);
      }
    })();
  };

  const onLoadMore = () => {
    setFetching(true);
    (async () => {
      try {
        setPollStart(
          (
            await requestFetchSummonerMatches(
              summonerProfile.puuid,
              Math.floor(matches[matches.length - 1].info.gameCreation / 1000),
            )
          ).startedAt,
        );
        setLoadMore(0);
        return;
      } catch (e) {
        console.error(e);
      }

      try {
        // get matches from local (fallback)
        const lastMatchId = matches.length ? matches[matches.length - 1].info.gameId : 0;
        const newMatchIds = (
          await getSummonerMatchIds(summonerProfile.puuid, lastMatchId)
        ).matchIds.filter((id) => matchIds.indexOf(id) === -1);
        setMatchIds(newMatchIds);
      } catch (e) {
        console.error(e);
        setFetching(false);
      } finally {
        setLoadMore(null);
        setPollStart(null);
      }
    })();
  };

  return (
    <>
      {summonerProfile && (
        <Head>
          <title>{summonerProfile.name} 게임 전적 - BARAM</title>
        </Head>
      )}
      <div css={style.profile}>
        <SummonerProfileCard
          profileIconId={summonerProfile.profileIconId}
          summonerName={summonerProfile.name}
          summonerLevel={summonerProfile.level}
          modifiedAt={new Date(summonerProfile.updatedAt).getTime()}
          challenges={summonerProfile.challenges}
          onClick={onUpdate}
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
          <Button width={'100%'} enabled={!fetching} onClick={onLoadMore}>
            {fetching ? '...' : '더보기'}
          </Button>
        )}
      </main>
    </>
  );
}
