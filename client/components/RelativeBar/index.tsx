import { style } from './style';

interface RelativeBarProps {
  label: string;
  point: number; // 기준이 되는 값
  maxOffset: number; // 값의 범위 : (point - maxOffset) ~ (point + maxOffset)
  value: number;
  foregroundColor: string;
  positiveColor: string;
  negativeColor: string;
  textColor: string;
}

function offsetHelper(point: number, value: number, maxOffset: number) {
  const offset = ((value - point) / maxOffset) * 50;
  if (offset < 0) return Math.max(-50, offset);
  return Math.min(50, offset);
}

function RelativeBar({
  label,
  point,
  value,
  maxOffset,
  foregroundColor,
  positiveColor,
  negativeColor,
  textColor,
}: RelativeBarProps) {
  const offset = offsetHelper(point, value, maxOffset);
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
