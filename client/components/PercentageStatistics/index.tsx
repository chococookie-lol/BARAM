import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import Percentage from '../Percentage';
import { style } from './style';

interface PercentageStatisticsProps {
  dealtPercent: number;
  healPercent: number;
  damagedPercent: number;
  deathPercent: number;
}

export default function PercentageStatistics({
  dealtPercent,
  healPercent,
  damagedPercent,
  deathPercent,
}: PercentageStatisticsProps) {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container}>
      <div css={style.slot}>
        <span css={style.span}>딜량</span>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.accent1}
          textColor={theme.background}
          value={dealtPercent}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span}>힐량</span>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.accent1}
          textColor={theme.background}
          value={healPercent}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span}>탱킹</span>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.accent1}
          textColor={theme.background}
          value={damagedPercent}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span}>데스</span>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.red3}
          textColor={theme.background}
          value={deathPercent}
        />
      </div>
    </div>
  );
}
