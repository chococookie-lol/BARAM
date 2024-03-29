import { useRecoilValue } from 'recoil';
import { useTheme } from '@emotion/react';
import Doughnut from '../Doughnut';
import PercentageStatistics from '../PercentageStatistics';
import { style } from './style';
import { totalStatisticsState } from '../../states/gameSlot';
import { useEffect, useState } from 'react';

interface WinRateProps {
  win: number;
  lose: number;
}

interface KDAProps {
  kills: number;
  deaths: number;
  assists: number;
  killContribution: number;
}

interface CampStatisticProps {
  blue: number;
  red: number;
}

interface GameContributionProps {
  rank: number;
  dealt: number;
  dealtAmount: number;
  heal: number;
  healAmount: number;
  damaged: number;
  damagedAmount: number;
  death: number;
  deathAmount: number;
}

export default function SummonerStatCard() {
  const { camp, winRate, kda, gameContribution } = useRecoilValue(totalStatisticsState);
  const [totalGameCount, setTotalGameCount] = useState<number>(0);

  useEffect(() => {
    setTotalGameCount(camp.blue + camp.red);
  }, [camp]);

  if (!totalGameCount)
    return <div css={[style.container, style.noMatchesText]}>해당하는 경기가 없습니다</div>;

  return (
    <div css={style.container}>
      <p css={style.title}>최근 {totalGameCount}게임 통계</p>
      <div css={style.flexBox}>
        <WinRate win={winRate.win} lose={winRate.lose} />
        <KDA
          kills={kda.kills}
          deaths={kda.deaths}
          assists={kda.assists}
          killContribution={kda.killContribution}
        />
        <CampStatistic blue={camp.blue} red={camp.red} />
        <GameContribution
          rank={gameContribution.rank}
          dealt={gameContribution.dealt}
          heal={gameContribution.heal}
          damaged={gameContribution.damaged}
          death={gameContribution.death}
          dealtAmount={gameContribution.dealtAmount}
          healAmount={gameContribution.healAmount}
          damagedAmount={gameContribution.damagedAmount}
          deathAmount={gameContribution.deathAmount}
        />
      </div>
    </div>
  );
}

function WinRate({ win, lose }: WinRateProps) {
  const theme = useTheme();

  const winRate = Math.floor((win / (win + lose)) * 100);

  return (
    <div css={style.winrateContainer}>
      <span css={style.statTitle}>승률</span>
      <Doughnut
        label={['승리', '패배']}
        val={[win, lose]}
        color={[theme.blue2, theme.red2]}
        title={`${isFinite(winRate) ? winRate : '100'}%`}
        size={110}
        textColor={theme.background}
      />
    </div>
  );
}

function KDA({ kills, assists, deaths, killContribution }: KDAProps) {
  const theme = useTheme();

  const kda = (kills + assists) / deaths;
  const kdaStr = isFinite(kda) ? kda.toFixed(2) : '∞';

  return (
    <div css={style.kdaContainer}>
      <span css={style.statTitle}>KDA</span>
      <div css={style.kda}>
        <p css={[style.color(theme.background), style.resetMargin]}>
          {kills}&nbsp;
          <span css={style.color(theme.neutral)}>/</span>
          <span css={style.color(theme.red2)}>&nbsp;{deaths}&nbsp;</span>
          <span css={style.color(theme.neutral)}>/</span>
          &nbsp;{assists}
        </p>
        <p css={[style.color(theme.background), style.fontSize('20px'), style.resetMargin]}>
          {kdaStr} : 1
        </p>
        <p css={[style.color(theme.red2), style.fontSize('14px'), style.resetMargin]}>
          킬관여 {(killContribution * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}

function CampStatistic({ blue, red }: CampStatisticProps) {
  const theme = useTheme();

  const title = blue >= red ? '블루' : '레드';
  const [major, minor] = blue >= red ? [blue, red] : [red, blue];

  return (
    <div css={style.winrateContainer}>
      <span css={style.statTitle}>진영</span>
      <Doughnut
        label={['블루', '레드']}
        val={[blue, red]}
        color={[theme.blue2, theme.red2]}
        title={`${title} ${((major / (major + minor)) * 100).toFixed(0)}%`}
        size={110}
        textColor={theme.background}
      />
    </div>
  );
}

function GameContribution({
  damaged,
  damagedAmount,
  dealt,
  dealtAmount,
  death,
  deathAmount,
  heal,
  healAmount,
  rank,
}: GameContributionProps) {
  const theme = useTheme();

  return (
    <>
      <div css={style.contributionContainer}>
        <span css={style.statTitle}>평균 게임 기여도</span>
        <div css={style.contribution}>
          <p css={[style.fontSize('20px'), style.color(theme.background)]}>
            {Math.round((rank + 1) * 10) / 10}위
          </p>
          <PercentageStatistics
            dealtPercent={dealt}
            dealtAmount={dealtAmount}
            healPercent={heal}
            healAmount={healAmount}
            damagedPercent={damaged}
            damagedAmount={damagedAmount}
            deathPercent={death}
            deathAmount={deathAmount}
            color={{ foreground: theme.background, background: theme.foreground }}
            padding={6}
          />
        </div>
      </div>
    </>
  );
}
