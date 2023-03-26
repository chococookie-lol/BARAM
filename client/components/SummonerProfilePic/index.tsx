import { css } from '@emotion/react';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonVersion } from '../../states/ddragon';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER } from '../../utils/ddragon';
import LazyImage from '../LazyImage';

interface SummonerProfilePicProps {
  id: number;
  width: number;
  height: number;
}

export default function SummonerProfilePic({ id, width, height }: SummonerProfilePicProps) {
  const version = useRecoilValueLoadable(ddragonVersion);
  const src =
    version.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${version.contents}/img/profileicon/${id}.png`
      : DEAFULT_PLACEHOLDER;
  return (
    <LazyImage
      innerCss={css`
        border-radius: 10px;
      `}
      src={src}
      width={width}
      height={height}
      alt={'summoner profile pic'}
    />
  );
}
