import { css } from '@emotion/react';
import { useState } from 'react';
import { generatePath } from './pathHelper';
import { style } from './style';

interface PieProps {
  val: number[];
  title: string;
  label: string[];
  color: string[];
  size?: number;
}

function Doughnut({ val, label, title, size = 100, color }: PieProps) {
  const viewBoxSize = 100;
  const radius = 44;
  const holeRadius = 30;
  const paths = generatePath(val, radius, holeRadius, viewBoxSize);
  const [hover, setHover] = useState(null);
  return (
    <div css={style(size)}>
      <a>{hover == null ? title : label[hover]}</a>
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
