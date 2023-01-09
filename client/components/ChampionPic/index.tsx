import Image from 'next/image';
import { css } from '@emotion/react';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonVersion } from '../../states/ddragon';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER } from '../../utils/ddragon';

interface ChampionPicProps {
  championName: string;
  width: number;
  height: number;
  shape?: 'rectangle' | 'round';
}

const style = {
  rectangle: css``,
  round: css`
    border-radius: 50%;
  `,
};

function ChampionPic({ championName, width, height, shape = 'round' }: ChampionPicProps) {
  const version = useRecoilValueLoadable(ddragonVersion);
  const src =
    version.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${version.contents}/img/champion/${championName}.png`
      : DEAFULT_PLACEHOLDER;
  return <Image css={style[shape]} src={src} width={width} height={height} alt={championName} />;
}

export default ChampionPic;
