import Image from 'next/image';
import { css } from '@emotion/react';

interface ChampionPicProps {
  championName: string;
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

function ChampionPic({ championName, version, width, height, shape = 'round' }: ChampionPicProps) {
  return (
    <Image
      css={style[shape]}
      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`}
      width={width}
      height={height}
      alt={championName}
    />
  );
}

export default ChampionPic;
