import { css } from '@emotion/react';
import SpellIcon from '../SpellIcon';

interface SpellStripProps {
  spells: string[];
  version: string;
  width: number;
  height: number;
  padding?: number;
  direction?: 'vertical' | 'horizontal';
}

const style = {
  vertical: (padding: number) => css`
    display: block;
    font-size: 0;
    div {
      padding-top: ${padding}px;
    }
  `,
  horizontal: (padding: number) => css`
    display: flex;
    font-size: 0;
    div {
      padding-left: ${padding}px;
    }
  `,
};

function SpellStrip({
  spells,
  version,
  width,
  height,
  padding = 3,
  direction = 'horizontal',
}: SpellStripProps) {
  const nullSpell = 'Summoner_UltBookPlaceholder';
  return (
    <div css={style[direction](padding)}>
      {spells.map((e, i) => (
        <div key={i}>
          <SpellIcon name={e ? e : nullSpell} version={version} width={width} height={height} />
        </div>
      ))}
    </div>
  );
}

export default SpellStrip;
