import { css } from '@emotion/react';

export const style = {
  container: (padding: number) => css`
    position: relative;
    display: block;
    width: 158px;
    margin-top: -${padding}px;
  `,
  slot: (color: string, padding: number) => css`
    position: relative;
    & > * {
      float: left;
      margin-top: ${padding}px;
    }
    & > p {
      margin-block: 0;
      margin-top: ${padding}px;
      margin-right: ${padding}px;
      font-size: 13px;
      line-height: 16px;
      vertical-align: middle;
      color: ${color};
    }
  `,
};
