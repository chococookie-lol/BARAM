import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import Percentage from '../Percentage';
import { style } from './style';

interface PercentageStatisticsProps {
  dealtPercent: number;
  dealtAmount: number;
  healPercent: number;
  healAmount: number;
  damagedPercent: number;
  damagedAmount: number;
  deathPercent: number;
  deathAmount: number;
}

export default function PercentageStatistics({
  dealtPercent,
  dealtAmount,
  healPercent,
  healAmount,
  damagedPercent,
  damagedAmount,
  deathPercent,
  deathAmount,
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
          percent={dealtPercent}
          value={dealtAmount}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span}>힐량</span>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.accent1}
          textColor={theme.background}
          percent={healPercent}
          value={healAmount}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span}>탱킹</span>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.accent1}
          textColor={theme.background}
          percent={damagedPercent}
          value={damagedAmount}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span}>데스</span>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.red3}
          textColor={theme.background}
          percent={deathPercent}
          value={deathAmount}
        />
      </div>
    </div>
  );
}
