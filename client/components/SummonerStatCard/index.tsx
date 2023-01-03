import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import Doughnut from '../Doughnut';
import PercentageStatistics from '../PercentageStatistics';
import { style } from './style';

export default function SummonerStatCard() {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container(theme.foreground)}>
      <p css={[style.title, style.color(theme.background)]}>최근 {20}게임 통계</p>
      <div css={style.flexBox}>
        <WinRate />
        <KDA />
        <CampStatistic />
        <GameContribution />
      </div>
    </div>
  );
}

function WinRate() {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.winrateContainer}>
      <span css={[style.color(theme.background), style.fontSize('13px'), style.statTitle]}>
        승률
      </span>
      <Doughnut
        label={['승리', '패배']}
        val={[12, 8]}
        color={[theme.blue2, theme.red2]}
        title={`${((12 / (12 + 8)) * 100).toFixed(0)}%`}
        size={110}
        textColor={theme.background}
      />
    </div>
  );
}

function KDA() {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.kdaContainer}>
      <span css={[style.color(theme.background), style.fontSize('13px'), style.statTitle]}>
        KDA
      </span>
      <div css={style.kda}>
        <p css={[style.color(theme.background), style.resetMargin]}>
          9.6&nbsp;
          <span css={style.color(theme.neutral)}>/</span>
          <span css={style.color(theme.red2)}>&nbsp;6.2&nbsp;</span>
          <span css={style.color(theme.neutral)}>/</span>
          &nbsp;12.5
        </p>
        <p css={[style.color(theme.background), style.fontSize('20px'), style.resetMargin]}>
          3.56 : 1
        </p>
        <p css={[style.color(theme.red2), style.fontSize('14px'), style.resetMargin]}>킬관여 61%</p>
      </div>
    </div>
  );
}

function CampStatistic() {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.winrateContainer}>
      <span css={[style.color(theme.background), style.fontSize('13px'), style.statTitle]}>
        진영
      </span>
      <Doughnut
        label={['블루', '레드']}
        val={[11, 9]}
        color={[theme.blue2, theme.red2]}
        title={`블루 ${((11 / (11 + 9)) * 100).toFixed(0)}%`}
        size={110}
        textColor={theme.background}
      />
    </div>
  );
}

function GameContribution() {
  const { theme } = useGlobalTheme();

  return (
    <>
      <div css={style.contributionContainer}>
        <span css={[style.color(theme.background), style.fontSize('13px'), style.statTitle]}>
          평균 게임 기여도
        </span>
        <div css={style.contribution}>
          <p css={[style.fontSize('20px'), style.color(theme.background)]}>2.5위</p>
          <PercentageStatistics
            dealtPercent={0.4}
            dealtAmount={4232}
            healPercent={0.2}
            healAmount={230}
            damagedPercent={0.4}
            damagedAmount={23940}
            deathPercent={0.3}
            deathAmount={2394}
            color={{ foreground: theme.background, background: theme.foreground }}
          />
        </div>
      </div>
    </>
  );
}
