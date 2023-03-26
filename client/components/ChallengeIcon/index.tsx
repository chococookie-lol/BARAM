import { css } from '@emotion/react';
import { DDRAGON_BASE_URL } from '../../utils/ddragon';
import LazyImage from '../LazyImage';

interface ChallengIconProps {
  id: number;
  tier: string;
  value: number;
  width: number;
  height: number;
}

export default function ChallengeIcon({ id, tier, value, width, height }: ChallengIconProps) {
  return (
    <LazyImage
      innerCss={css`
        border-radius: 50%;
      `}
      src={`${DDRAGON_BASE_URL}img/challenges-images/${id}-${tier}.png`}
      alt={`${id} : ${value}`}
      height={height}
      width={width}
    />
  );
}
