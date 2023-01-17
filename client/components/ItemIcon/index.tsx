import Image from 'next/image';
import { css } from '@emotion/react';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonVersions } from '../../states/ddragon';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER, getMajorVersion } from '../../utils/ddragon';

interface ItemIconProps {
  id: number;
  version?: string;
  width: number;
  height: number;
}

const style = css`
  border-radius: 13%;
`;

function ItemIcon({ id, version, width, height }: ItemIconProps) {
  // const version = useRecoilValueLoadable(ddragonVersion);
  const versions = useRecoilValueLoadable(ddragonVersions);
  const src =
    versions.state === 'hasValue' && version !== undefined
      ? `${DDRAGON_BASE_URL}${getMajorVersion(versions.contents, version)}/img/item/${id}.png`
      : DEAFULT_PLACEHOLDER;
  return <Image css={style} src={src} width={width} height={height} alt={id.toString()} />;
}

export default ItemIcon;
