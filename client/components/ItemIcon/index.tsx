import Image from 'next/image';
import { css } from '@emotion/react';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonVersion } from '../../states/ddragon';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER } from '../../utils/ddragon';

interface ItemIconProps {
  id: number;
  width: number;
  height: number;
}

const style = css`
  border-radius: 13%;
`;

function ItemIcon({ id, width, height }: ItemIconProps) {
  const version = useRecoilValueLoadable(ddragonVersion);
  const src =
    version.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${version.contents}/img/item/${id}.png`
      : DEAFULT_PLACEHOLDER;
  return <Image css={style} src={src} width={width} height={height} alt={id.toString()} />;
}

export default ItemIcon;
