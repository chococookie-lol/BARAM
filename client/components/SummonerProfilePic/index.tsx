import { css } from '@emotion/react';
import Image from 'next/image';

interface SummonerProfilePicProps {
  version: string;
  id: number;
  width: number;
  height: number;
}

function SummonerProfilePic({ version, id, width, height }: SummonerProfilePicProps) {
  return (
    <Image
      css={css`
        border-radius: 10px;
      `}
      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${id}.png`}
      width={width}
      height={height}
      alt={'summoner profile pic'}
    />
  );
}

export default SummonerProfilePic;
