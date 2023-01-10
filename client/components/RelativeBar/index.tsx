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

function offsetHelper(average: number, value: number, maxOffset: number) {
  const offset = ((value - average) / maxOffset) * 50;
  return offset < 0 ? Math.max(-50, Math.min(offset, -15)) : Math.min(50, Math.max(offset, 15));
}

function RelativeBar({
  label,
  average,
  value,
  maxOffset,
  foregroundColor,
  positiveColor,
  negativeColor,
  textColor,
}: RelativeBarProps) {
  const offset = offsetHelper(average, value, maxOffset);
  return (
    <div css={style.container}>
      <div css={style.bar(positiveColor, negativeColor, offset)} />
      <div css={style.point(foregroundColor)}>
        <div css={style.text(textColor)}>{label}</div>
      </div>
    </div>
  );
}

export default RelativeBar;
