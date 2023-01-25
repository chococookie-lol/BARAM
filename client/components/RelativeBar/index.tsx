import { style } from './style';

interface RelativeBarProps {
  label: string;
  average: number; // 기준이 되는 값
  maxOffset: number; // 값의 범위 : 표현 범위 (point - maxOffset) ~ (point + maxOffset)
  value: number;
  foregroundColor: string;
  positiveColor: string;
  negativeColor: string;
  textColor: string;
}

export default function RelativeBar({
  label,
  average,
  value,
  maxOffset,
  foregroundColor,
  positiveColor,
  negativeColor,
  textColor,
}: RelativeBarProps) {
  const offset = calculateOffset(average, value, maxOffset);
  return (
    <div css={style.container}>
      <div css={style.bar(positiveColor, negativeColor, offset)} />
      <div css={style.point(foregroundColor)}>
        <div css={style.text(textColor)}>{label}</div>
      </div>
    </div>
  );
}

function calculateOffset(average: number, value: number, maxOffset: number) {
  const isPositive = value - average > 0;
  const diff = Math.abs(value - average);
  const percent = Math.min(50, (diff / maxOffset) * 35 + 15);

  return (isPositive ? 1 : -1) * percent;
}
