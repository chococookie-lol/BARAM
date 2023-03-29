import { useRecoilValueLoadable } from 'recoil';
import { ddragonRunes } from '../../states/ddragon';
import {
  DDRAGON_BASE_URL,
  DEAFULT_PLACEHOLDER,
  runeIdToIcon,
  runeStyleIdToIcon,
} from '../../utils/ddragon';
import LazyImage from '../LazyImage';
import { style } from './style';

interface RuneIconProps {
  version: string;
  styleId: number;
  runeId?: number;
  width: number;
  height: number;
}

export default function RuneIcon({ version, styleId, runeId, width, height }: RuneIconProps) {
  const runes = useRecoilValueLoadable(ddragonRunes(version));
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
      <LazyImage src={src} width={width} height={height} alt={'rune'} />
    </div>
  );
}
