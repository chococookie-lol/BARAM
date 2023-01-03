import { useState } from 'react';
import { generatePath } from './pathHelper';
import { style } from './style';

interface DoughnutProps {
  val: number[];
  title: string;
  label: string[];
  color: string[];
  textColor: string;
  size?: number;
}

function Doughnut({ val, label, title, size = 100, color, textColor }: DoughnutProps) {
  const viewBoxSize = 100;
  const radius = 44;
  const holeRadius = 30;
  const paths = generatePath(val, radius, holeRadius, viewBoxSize);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div css={style.container}>
      <div css={style.text(size, textColor)}>{hover === null ? title : label[hover]}</div>
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
    </div>
  );
}

export default Doughnut;
