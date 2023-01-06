import Image from 'next/image';
import { css } from '@emotion/react';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonSpells, ddragonVersion } from '../../states/ddragon';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER, spellIdToIcon } from '../../utils/ddragon';

interface SpellIconProps {
  id: number;
  width: number;
  height: number;
}

function SpellIcon({ id, width, height }: SpellIconProps) {
  const spells = useRecoilValueLoadable(ddragonSpells);
  const version = useRecoilValueLoadable(ddragonVersion);

  const src =
    spells.state === 'hasValue' && version.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${version.contents}/img/spell/${spellIdToIcon(spells.contents, id)}`
      : DEAFULT_PLACEHOLDER;
  return (
    <Image
      css={css`
        border-radius: 13%;
      `}
      src={src}
      width={width}
      height={height}
      alt={'spell'}
    />
  );
}

export default SpellIcon;
