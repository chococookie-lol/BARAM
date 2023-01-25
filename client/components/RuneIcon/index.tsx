import Image from 'next/image';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonRunes, ddragonVersions } from '../../states/ddragon';
import {
  DDRAGON_BASE_URL,
  DEAFULT_PLACEHOLDER,
  getMajorVersion,
  runeIdToIcon,
  runeStyleIdToIcon,
} from '../../utils/ddragon';
import { style } from './style';

interface RuneIconProps {
  version: string;
  styleId: number;
  runeId?: number;
  width: number;
  height: number;
}

export default function RuneIcon({ version, styleId, runeId, width, height }: RuneIconProps) {
  const versions = useRecoilValueLoadable(ddragonVersions);
  const runes = useRecoilValueLoadable(
    ddragonRunes(
      getMajorVersion(versions.state === 'hasValue' ? versions.contents : [], version) ?? '13.1.1',
    ),
  );
  const src =
    runes.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}img/${
          runeId
            ? runeIdToIcon(runes.contents, styleId, runeId)
            : runeStyleIdToIcon(runes.contents, styleId)
        }`
      : DEAFULT_PLACEHOLDER;
  return (
    <div css={style(width, height)}>
      <Image src={src} width={width} height={height} alt={'rune'} />
    </div>
  );
}
