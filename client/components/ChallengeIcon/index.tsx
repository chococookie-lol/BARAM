import { css } from '@emotion/react';
import Image from 'next/image';
import { DDRAGON_BASE_URL, DEAFULT_PLACEHOLDER } from '../../utils/ddragon';

interface ChallengIconProps {
  id: number | undefined;
  tier: string | undefined;
  value: number | undefined;
  width: number;
  height: number;
}

function ChallengeIcon({ id, tier, value, width, height }: ChallengIconProps) {
  return (
    <Image
      css={css`
        border-radius: 50%;
      `}
      src={
        id && tier
          ? `${DDRAGON_BASE_URL}img/challenges-images/${id}-${tier}.png`
          : DEAFULT_PLACEHOLDER
      }
      alt={`${id} : ${value}`}
      height={height}
      width={width}
    />
  );
}

export default ChallengeIcon;
