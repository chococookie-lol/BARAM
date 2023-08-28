import { css } from '@emotion/react';
import { useGlobalTheme } from '../../styles/GlobalThemeContextLegacy';
import RelativeBar from '../RelativeBar';

interface RelativeStatisticsProps {
  dealAverage: number;
  dealMaxOffset: number;
  dealValue: number;
  goldAverage: number;
  goldMaxOffset: number;
  goldValue: number;
  deathAverage: number;
  deathMaxOffset: number;
  deathValue: number;
  csAverage: number;
  csMaxOffset: number;
  csValue: number;
}

export default function RelativeStatistics({
  dealAverage,
  dealMaxOffset,
  dealValue,
  goldAverage,
  goldMaxOffset,
  goldValue,
  deathAverage,
  deathMaxOffset,
  deathValue,
  csAverage,
  csMaxOffset,
  csValue,
}: RelativeStatisticsProps) {
  const { theme } = useGlobalTheme();
  const neg = theme.red3;
  const pos = theme.accent1;
  const fg = theme.foreground;
  const text = 'white';
  return (
    <div
      css={css`
        margin-top: -1px;
        & > * {
          margin-top: 1px;
        }
      `}
    >
      <RelativeBar
        label={'딜'}
        average={dealAverage}
        maxOffset={dealMaxOffset}
        value={dealValue}
        foregroundColor={fg}
        positiveColor={pos}
        negativeColor={neg}
        textColor={text}
      />
      <RelativeBar
        label={'골'}
        average={goldAverage}
        maxOffset={goldMaxOffset}
        value={goldValue}
        foregroundColor={fg}
        positiveColor={pos}
        negativeColor={neg}
        textColor={text}
      />
      <RelativeBar
        label={'CS'}
        average={csAverage}
        maxOffset={csMaxOffset}
        value={csValue}
        foregroundColor={fg}
        positiveColor={pos}
        negativeColor={neg}
        textColor={text}
      />
      <RelativeBar
        label={'뎃'}
        average={deathAverage}
        maxOffset={deathMaxOffset}
        value={deathValue}
        foregroundColor={fg}
        positiveColor={neg}
        negativeColor={pos}
        textColor={text}
      />
    </div>
  );
}
