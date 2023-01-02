import { css } from '@emotion/react';
import Image from 'next/image';

interface ChallengIconProps {
  id: number;
  tier: string;
  label: string;
  value: number;
  width: number;
  height: number;
}

function ChallengeIcon({ id, tier, label, value, width, height }: ChallengIconProps) {
  return (
    <Image
      css={css`
        border-radius: 50%;
      `}
      src={`https://ddragon.leagueoflegends.com/cdn/img/challenges-images/${id}-${tier}.png`}
      alt={`${label} : ${value}`}
      height={height}
      width={width}
    />
  );
}

export default ChallengeIcon;
