import Image from 'next/image';
import { css } from '@emotion/react';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER_GRAY } from '../../utils/ddragon';

interface ItemIconProps {
  id: number;
  version: string;
  width: number;
  height: number;
}

const style = css`
  border-radius: 13%;
`;

export default function ItemIcon({ id, version, width, height }: ItemIconProps) {
  const src = id ? `${DDRAGON_BASE_URL}${version}/img/item/${id}.png` : DEAFULT_PLACEHOLDER_GRAY;

  return <Image css={style} src={src} width={width} height={height} alt={id.toString()} />;
}
