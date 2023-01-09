import { css } from '@emotion/react';
import Image from 'next/image';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonVersion } from '../../states/ddragon';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER } from '../../utils/ddragon';

interface SummonerProfilePicProps {
  id: number;
  width: number;
  height: number;
}

function SummonerProfilePic({ id, width, height }: SummonerProfilePicProps) {
  const version = useRecoilValueLoadable(ddragonVersion);
  const src =
    version.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${version.contents}/img/profileicon/${id}.png`
      : DEAFULT_PLACEHOLDER;
  return (
    <Image
      css={css`
        border-radius: 10px;
      `}
      src={src}
      width={width}
      height={height}
      alt={'summoner profile pic'}
    />
  );
}

export default SummonerProfilePic;
