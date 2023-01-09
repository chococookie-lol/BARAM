import { css } from '@emotion/react';

export const style = {
  container: css`
    position: relative;
    height: 16px;
    width: 118px;
  `,
  outer: (backgroundColor: string) => css`
    position: absolute;
    background-color: ${backgroundColor};
    border-radius: 11px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  `,
  inner: (foregroundColor: string, percentage: string) => css`
    position: absolute;
    background-color: ${foregroundColor};
    border-radius: 0 11px 11px 0;
    top: 0;
    left: 0;
    width: ${percentage};
    height: 100%;
  `,
  text: (color: string) => css`
    line-height: 16px;
    color: ${color};
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 13px;
    text-align: center;
    vertical-align: middle;
  `,
};
