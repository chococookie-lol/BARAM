import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import Percentage from '../Percentage';
import { style } from './style';

interface ColorProps {
  background: string;
  foreground: string;
}

interface PercentageStatisticsProps {
  dealtPercent: number;
  dealtAmount: number;
  healPercent: number;
  healAmount: number;
  damagedPercent: number;
  damagedAmount: number;
  deathPercent: number;
  deathAmount: number;
  color?: ColorProps;
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
  color,
}: PercentageStatisticsProps) {
  const { theme } = useGlobalTheme();
  const foreground = color?.foreground ?? theme.foreground;
  const background = color?.background ?? theme.background;

  return (
    <div css={style.container}>
      <div css={style.slot}>
        <span css={style.span(foreground)}>딜량</span>
        <Percentage
          backgroundColor={foreground}
          foregroundColor={theme.accent1}
          textColor={background}
          percent={dealtPercent}
          value={dealtAmount}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span(foreground)}>힐량</span>
        <Percentage
          backgroundColor={foreground}
          foregroundColor={theme.accent1}
          textColor={background}
          percent={healPercent}
          value={healAmount}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span(foreground)}>탱킹</span>
        <Percentage
          backgroundColor={foreground}
          foregroundColor={theme.accent1}
          textColor={background}
          percent={damagedPercent}
          value={damagedAmount}
        />
      </div>
      <div css={style.slot}>
        <span css={style.span(foreground)}>데스</span>
        <Percentage
          backgroundColor={foreground}
          foregroundColor={theme.red3}
          textColor={background}
          percent={deathPercent}
          value={deathAmount}
        />
      </div>
    </div>
  );
}
