import React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import { generatePath } from './path';
import { style } from './style';

const viewBoxSize = 100;

interface DoughnutProps {
  val: number[];
  title: string;
  label: string[];
  color: string[];
  textColor: string;
  size?: number;
}

interface DoughnutGraphProps {
  val: number[];
  size: number;
  setHover: Dispatch<SetStateAction<number | null>>;
  color: string[];
}

const DoughnutGraph = React.memo(function DoughnutGraph({
  val,
  size,
  setHover,
  color,
}: DoughnutGraphProps) {
  const radius = 44;
  const holeRadius = 30;
  const paths = generatePath(val, radius, holeRadius, viewBoxSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((e, i) => {
        return (
          <path
            onMouseOver={() => setHover(i)}
            onMouseOut={() => setHover(null)}
            key={i}
            fill={color[i]}
            d={e.path}
            transform={`rotate(${e.rotation})`}
          />
        );
      })}
    </svg>
  );
});

export default function Doughnut({
  val,
  label,
  title,
  size = 100,
  color,
  textColor,
}: DoughnutProps) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div css={style.container}>
      <div css={style.text(size, textColor)}>{hover === null ? title : label[hover]}</div>
      <DoughnutGraph val={val} size={size} setHover={setHover} color={color} />
    </div>
  );
}
