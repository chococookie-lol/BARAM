import { Theme, css } from '@emotion/react';

export const style = {
  wrapper: css`
    position: relative;
  `,
  container: (theme: Theme) => css`
    width: 740px;
    height: 60px;
    border-radius: 40px;
    border: 1px solid ${theme.accent1};
    position: relative;
  `,
  input: css`
    border: none;
    outline: none;
    appearance: none;
    position: relative;
    left: 14px;
    font-size: 16px;
    width: calc(100% - 70px);
    height: 45px;
  `,
  flex: css`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  `,
  button: (theme: Theme) => css`
    width: 40px;
    height: 40px;
    background-color: ${theme.accent1};
    border-radius: 50%;

    &:active {
      filter: brightness(0.9);
    }
  `,
  search: css`
    transform: translate(50%, 50%);
  `,
  panelContainer: css`
    margin-left: 25px;
    margin-top: 1px;
    z-index: 1000;
    position: absolute;
    top: 62px;
    left: 0;
  `,
};
