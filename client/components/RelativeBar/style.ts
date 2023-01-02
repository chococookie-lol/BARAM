import { css } from '@emotion/react';

export const style = {
  container: css`
    width: 124px;
    height: 22px;
    position: relative;
  `,
  bar: (positiveColor: string, negativeColor: string, offset: number) => css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(${offset < 0 ? '-100%' : '0'}, -50%);
    background-color: ${offset < 0 ? negativeColor : positiveColor};
    width: ${offset < 0 ? -offset : offset}%;
    height: 12px;
    border-radius: 6px;
  `,
  point: (backgroundColor: string) => css`
    position: absolute;
    width: 22px;
    height: 22px;
    background-color: ${backgroundColor};
    border-radius: 11px;
    left: 50%;
    transform: translate(-50%, 0);
  `,
  text: (textColor: string) => css`
    display: block;
    font-size: 9px;
    text-align: center;
    line-height: 22px;
    color: ${textColor};
  `,
};
