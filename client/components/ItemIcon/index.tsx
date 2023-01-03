import Image from 'next/image';
import { css } from '@emotion/react';

interface ItemIconProps {
  id: number;
  version: string;
  width: number;
  height: number;
}

const style = css`
  border-radius: 13%;
`;

function ItemIcon({ id, version, width, height }: ItemIconProps) {
  return (
    <Image
      css={style}
      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`}
      width={width}
      height={height}
      alt={id.toString()}
    />
  );
}

export default ItemIcon;
