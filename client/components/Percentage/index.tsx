import { style } from './style';

interface PercentageProps {
  backgroundColor: string;
  foregroundColor: string;
  textColor: string;
  value: number;
}

export default function Percentage({
  backgroundColor,
  foregroundColor,
  textColor,
  value,
}: PercentageProps) {
  const percent = value * 100;
  const padding = 10;

  if (percent < 0) {
    throw new Error('value must be positive');
  }

  return (
    <div css={style.container}>
      <div css={style.outer(backgroundColor)}></div>
      <div
        css={style.inner(foregroundColor, `${percent > 100 - padding ? 100 : percent + padding}%`)}
      ></div>
      <div css={style.text(textColor)}>{percent}%</div>
    </div>
  );
}
