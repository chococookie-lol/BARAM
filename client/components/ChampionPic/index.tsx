import Image from 'next/image';
import { css } from '@emotion/react';
import { useRecoilValueLoadable } from 'recoil';
import { ddragonChampions } from '../../states/ddragon';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER } from '../../utils/ddragon';

interface ChampionPicProps {
  championKey: string | number;
  version: string;
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

export default function ChampionPic({
  championKey,
  version,
  width,
  height,
  shape = 'round',
}: ChampionPicProps) {
  const championDic = useRecoilValueLoadable(ddragonChampions(version));
  const src =
    championDic.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${version}/img/champion/${championDic.contents[championKey]}.png`
      : DEAFULT_PLACEHOLDER;

  return (
    <Image
      css={style[shape]}
      src={src}
      width={width}
      height={height}
      alt={championDic.contents[championKey]}
    />
  );
}
