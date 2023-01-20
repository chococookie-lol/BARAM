import Image from 'next/image';
import { css } from '@emotion/react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { ddragonChampions, ddragonVersion, ddragonVersions } from '../../states/ddragon';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER, getMajorVersion } from '../../utils/ddragon';

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

function ChampionPic({ championKey, version, width, height, shape = 'round' }: ChampionPicProps) {
  const versions = useRecoilValue(ddragonVersions);
  const championDic = useRecoilValueLoadable(
    ddragonChampions(getMajorVersion(versions, version) || '13.1.1'),
  );
  const src =
    championDic.state === 'hasValue'
      ? `${DDRAGON_BASE_URL}${getMajorVersion(versions, version) || '13.1.1'}/img/champion/${
          championDic.contents[championKey]
        }.png`
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

export default ChampionPic;
