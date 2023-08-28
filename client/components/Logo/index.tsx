import { css, useTheme } from '@emotion/react';
import { useRouter } from 'next/router';
import LogoSvg from '/assets/logo.svg';

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width, height }: LogoProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (router.isReady) {
          router.push('/');
        }
      }}
    >
      <LogoSvg
        css={css`
          ${width ? `width: ${width}px;` : null}
          ${height ? `height: ${height}px;` : null}
        `}
        fill={theme.accent1}
      />
    </div>
  );
}
