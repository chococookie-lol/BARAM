import Image from 'next/image';
import { css } from '@emotion/react';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonSpells } from '../../states/ddragon';
import {
  DDRAGON_BASE_URL,
  DEAFULT_PLACEHOLDER,
  spellIdToIcon,
} from '../../utils/ddragon';

interface SpellIconProps {
  version: string;
  id: number;
  width: number;
  height: number;
}

export default function SpellIcon({ version, id, width, height }: SpellIconProps) {
  const spells = useRecoilValueLoadable(ddragonSpells(version));

  const src =
    spells.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${version}/img/spell/${spellIdToIcon(spells.contents, id)}`
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
