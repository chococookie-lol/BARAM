import { css } from '@emotion/react';
import SpellIcon from '../SpellIcon';

interface SpellStripProps {
  version: string;
  spells: number[];
  width: number;
  height: number;
  padding?: number;
  direction?: 'vertical' | 'horizontal';
}

const style = {
  vertical: (padding: number) => css`
    margin-top: -${padding}px;
    & > * {
      display: block;
      margin-top: ${padding}px;
    }
  `,
  horizontal: (padding: number) => css`
    margin-left: -${padding}px;
    & > * {
      display: inline-block;
      margin-left: ${padding}px;
    }
  `,
};

function SpellStrip({
  version,
  spells,
  width,
  height,
  padding = 3,
  direction = 'horizontal',
}: SpellStripProps) {
  const nullSpell = 54;
  return (
    <div css={style[direction](padding)}>
      {spells.map((e, i) => (
        <SpellIcon version={version} key={i} id={e ? e : nullSpell} width={width} height={height} />
      ))}
    </div>
  );
}

export default SpellStrip;
