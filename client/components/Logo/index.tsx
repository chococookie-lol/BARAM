import { css } from '@emotion/react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import LogoSvg from '/assets/logo.svg';

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width, height }: LogoProps) {
  const context = useGlobalTheme();
  return (
    <LogoSvg
      css={css`
        ${width ? `width: ${width}px;` : null}
        ${height ? `height: ${height}px;` : null}
      `}
      fill={context.theme.accent1}
    />
  );
}
