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
        <SpellIcon
          key={i}
          name={e ? e : nullSpell}
          version={version}
          width={width}
          height={height}
        />
      ))}
    </div>
  );
}

export default SpellStrip;
