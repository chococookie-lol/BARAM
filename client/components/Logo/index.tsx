import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import LogoSvg from '/assets/logo.svg';

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width, height }: LogoProps) {
  const context = useGlobalTheme();
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
        fill={context.theme.accent1}
      />
    </div>
  );
}
