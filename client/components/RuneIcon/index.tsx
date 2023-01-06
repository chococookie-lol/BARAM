import Image from 'next/image';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonRunes } from '../../states/ddragon';
import {
  DDRAGON_BASE_URL,
  DEAFULT_PLACEHOLDER,
  runeIdToIcon,
  runeStyleIdToIcon,
} from '../../utils/ddragon';
import { style } from './style';

interface RuneIconProps {
  styleId: number;
  runeId: number | undefined;
  width: number;
  height: number;
}

function RuneIcon({ styleId, runeId, width, height }: RuneIconProps) {
  const runes = useRecoilValueLoadable(ddragonRunes);
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

export default RuneIcon;
