import Image from 'next/image';
import { css } from '@emotion/react';

interface SpellIconProps {
  name: string;
  version: string;
  width: number;
  height: number;
}

function SpellIcon({ name, version, width, height }: SpellIconProps) {
  return (
    <Image
      css={css`
        border-radius: 13%;
      `}
      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${name}.png`}
      width={width}
      height={height}
      alt={name}
    />
  );
}

export default SpellIcon;
