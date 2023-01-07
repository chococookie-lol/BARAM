import { css } from '@emotion/react';
import Image from 'next/image';
import { DDRAGON_BASE_URL } from '../../utils/ddragon';

interface ChallengIconProps {
  id: number;
  tier: string;
  value: number;
  width: number;
  height: number;
}

function ChallengeIcon({ id, tier, value, width, height }: ChallengIconProps) {
  return (
    <Image
      css={css`
        border-radius: 50%;
      `}
      src={`${DDRAGON_BASE_URL}img/challenges-images/${id}-${tier}.png`}
      alt={`${id} : ${value}`}
      height={height}
      width={width}
    />
  );
}

export default ChallengeIcon;
