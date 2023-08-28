import { Theme, css } from '@emotion/react';

export const style = {
  container: css`
    width: 654px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 4px 4px;
  `,
  button: (buttonColor: string, fontColor: string) => css`
    width: 50%;
    height: 40px;

    background: ${buttonColor};
    color: ${fontColor};
    border: none;
    padding: 0;
    font: inherit;
    outline: none;

    &:active {
      filter: brightness(0.95);
    }
  `,
  ul: (theme: Theme) => css`
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 0 0 4px 4px;

    & > li {
      padding: 8px 24px;

      display: flex;
      justify-content: space-between;

      color: ${theme.foreground};
      background: ${theme.background};

      &:hover {
        filter: brightness(0.95);
      }

      & > span {
        padding-top: 2px;
        line-height: 24px;
      }

      & > div {
        display: flex;
        align-items: center;

        & > button {
          border: none;
          outline: none;
          background: inherit;
          color: ${theme.foreground};
          padding-top: 4px;
          user-select: none;

          &:hover {
            color: #e53e3e;
            transition: all 0.3s ease;
          }
        }
      }
    }

    & > li:last-child {
      border-radius: 0 0 4px 4px;
    }
  `,
};
