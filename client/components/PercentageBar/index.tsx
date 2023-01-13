import { css } from '@emotion/react';
import { useState } from 'react';

interface PercentageBarProps {
  amounts: number[];
  colors: string[];
}

const style = {
  container: css`
    width: 115px;
    height: 16px;
    border-radius: 15px;
    position: relative;
    flex-direction: column;
  `,
  inner: (start: number, percentage: number, color: string) => css`
    position: absolute;
    left: ${start}%;
    top: 0;
    height: 100%;
    width: ${percentage}%;
    background-color: ${color};
  `,
  text: css`
    line-height: 16px;
    color: black;
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 13px;
    text-align: center;
    vertical-align: middle;
  `,
  span: css`
    color: white;
    border-radius: 10px;
  `,
};

export default function PercentageBar({ amounts, colors }: PercentageBarProps) {
  const total = amounts.reduce((acc, amount) => acc + amount, 0);
  const percent = amounts.map((amount) => (amount / total) * 100);
  const acc = percent.reduce(
    (prev, cur) => {
      prev.push((prev.at(-1) ?? 0) + cur);
      return prev;
    },
    [0],
  );
  const [text, setText] = useState<string>('');

  return (
    <div css={style.container}>
      {Array(amounts.length)
        .fill(0)
        .map((_, index) => (
          <div
            key={`percentageBar-${index}`}
            css={style.inner(acc[index], percent[index], colors[index])}
            // TODO: 이벤트 문제 해결
            onMouseEnter={() => setText(amounts[index].toString())}
            onMouseLeave={() => setText('')}
          ></div>
        ))}
      <div css={style.text}>
        <span css={style.span}>&nbsp; {text} &nbsp;</span>
      </div>
    </div>
  );
}
