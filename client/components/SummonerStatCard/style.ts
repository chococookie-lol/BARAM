import { Theme, css } from '@emotion/react';

export const style = {
  container: (theme: Theme) => css`
    width: 777px;
    height: 219px;
    background-color: ${theme.foreground};
    border-radius: 10px;
    user-select: none;
  `,
  noMatchesText: (theme: Theme) => css`
    line-height: 219px;
    color: ${theme.neutral};
    text-align: center;
  `,
  title: (theme: Theme) => css`
    margin: 0;
    padding: 20px 0 20px 20px;
    color: ${theme.background};
  `,
  flexBox: css`
    display: flex;
    justify-content: space-around;
    width: 96%;
    height: 160px;
    margin: auto;
  `,
  winrateContainer: css`
    display: flex;
    flex-direction: column;
    text-align: center;
  `,
  color: (color: string) => css`
    color: ${color};
  `,
  fontSize: (size: string) => css`
    font-size: ${size};
  `,
  statTitle: (theme: Theme) => css`
    margin-bottom: 10px;
    color: ${theme.background};
    font-size: 13px;
  `,
  resetMargin: css`
    margin: 0;
  `,
  kdaContainer: css`
    position: relative;
    text-align: center;
  `,
  kda: css`
    position: relative;
    left: 0;
    top: 18%;
  `,
  contributionContainer: css`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 240px;
  `,
  contribution: css`
    padding-top: 15px;
    display: flex;
    justify-content: space-around;
  `,
};
