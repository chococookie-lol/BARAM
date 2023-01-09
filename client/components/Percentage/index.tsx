import { useState } from 'react';
import { style } from './style';

interface PercentageProps {
  backgroundColor: string;
  foregroundColor: string;
  textColor: string;
  percent: number;
  value: number;
}

export default function Percentage({
  backgroundColor,
  foregroundColor,
  textColor,
  percent,
  value,
}: PercentageProps) {
  if (value < 0) {
    throw new Error('value must be positive');
  }
  const displayPercent = Math.round(percent * 10000) / 100;
  const padding = 10;
  const [displayText, setDisplayText] = useState<string>(`${displayPercent}%`);

  return (
    <div
      css={style.container}
      onMouseEnter={() => {
        setDisplayText(value.toString());
      }}
      onMouseLeave={() => {
        setDisplayText(`${displayPercent}%`);
      }}
    >
      <div css={style.outer(backgroundColor)}></div>
      <div
        css={style.inner(
          foregroundColor,
          `${displayPercent > 100 - padding ? 100 : displayPercent + padding}%`,
        )}
      ></div>
      <div css={style.text(textColor)}>{displayText}</div>
    </div>
  );
}
