import { css } from '@emotion/react';

export const style = {
  container: css`
    position: relative;
    path {
      transform-origin: 50% 50%;
      opacity: 0.85;
      scale: 1;
      transition: scale 0.2s, opacity 0.2s;
    }
    path:hover {
      opacity: 1;
      scale: 1.05;
      transition: scale 0.2s, opacity 0.2s;
    }
  `,
  text: (size: number, textColor: string) => css`
    position: absolute;
    font-size: 13px;
    top: ${size / 2}px;
    left: ${size / 2}px;
    transform: translate(-50%, -50%);
    color: ${textColor};
  `,
};
