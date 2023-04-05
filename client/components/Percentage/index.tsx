import { useEffect, useState } from 'react';
import { style } from './style';

interface PercentageProps {
  containerBackgroundColor?: string;
  backgroundColor: string;
  foregroundColor: string;
  textColor: string;
  percent: number;
  maxPercent?: number;
  value: number;
  scale?: number;
}

export default function Percentage({
  containerBackgroundColor = 'lightgray',
  backgroundColor,
  foregroundColor,
  textColor,
  percent,
  maxPercent = 40,
  value,
  scale = 1,
}: PercentageProps) {
  if (value < 0) {
    throw new Error('value must be positive');
  }
  const displayPercent = percent ? Math.round(percent * 10000) / 100 : 0;
  const [displayText, setDisplayText] = useState<string>(`${displayPercent}%`);

  useEffect(() => {
    setDisplayText(`${displayPercent}%`);
  }, [displayPercent]);

  return (
    <div
      css={style.container(containerBackgroundColor)}
      onMouseEnter={() => {
        setDisplayText(value.toString());
      }}
      onMouseLeave={() => {
        setDisplayText(`${displayPercent}%`);
      }}
    >
      <div css={style.outer(backgroundColor, scale)}>
        <div css={style.inner(foregroundColor, `${(displayPercent * 100) / maxPercent}%`)} />
      </div>

      <div css={style.text(textColor)}>{displayText}</div>
    </div>
  );
}
