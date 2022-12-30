import { css } from '@emotion/react';

export const style = (size: number) => css`
  position: relative;
  a {
    font-size: 13px;
    position: absolute;
    top: ${size / 2}px;
    left: ${size / 2}px;
    transform: translate(-50%, -50%);
  }
  path {
    transform-origin: 50% 50%;
    opacity: 0.85;
    scale: 1;
    transition: 0.2s;
  }
  path:hover {
    opacity: 1;
    scale: 1.05;
    transition: 0.2s;
  }
`;
