import { css } from '@emotion/react';

export const style = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 158px;
  `,
  slot: css`
    display: flex;
    width: 158px;
  `,
  span: (color: string) => css`
    padding: 0 5px;
    color: ${color};
  `,
};
