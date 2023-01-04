import { css } from '@emotion/react';

export const style = {
  primary: (width: number, height: number) => css`
    width: ${width}px;
    height: ${height}px;
    border-radius: 50%;
    background-color: black;
  `,
  secondary: (width: number, height: number) => css`
    overflow: hidden;
    width: ${width}px;
    height: ${height}px;
    border-radius: 50%;
    background-color: black;
    * {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `,
};
