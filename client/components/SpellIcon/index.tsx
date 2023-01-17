import Image from 'next/image';
import { css } from '@emotion/react';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonSpells, ddragonVersions } from '../../states/ddragon';
import {
  DDRAGON_BASE_URL,
  DEAFULT_PLACEHOLDER,
  getMajorVersion,
  spellIdToIcon,
} from '../../utils/ddragon';

interface SpellIconProps {
  version: string;
  id: number;
  width: number;
  height: number;
}

function SpellIcon({ version, id, width, height }: SpellIconProps) {
  const versions = useRecoilValueLoadable(ddragonVersions);
  const majorVersion =
    getMajorVersion(versions.state === 'hasValue' ? versions.contents : [], version) ?? '13.1.1';
  const spells = useRecoilValueLoadable(ddragonSpells(majorVersion));

  const src =
    spells.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${majorVersion}/img/spell/${spellIdToIcon(spells.contents, id)}`
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
