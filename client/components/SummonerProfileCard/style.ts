import { css } from '@emotion/react';

export const style = {
  container: css`
    width: 235px;
    height: 189px;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    user-select: none;
  `,
  backgroundColor: (color: string) => css`
    background-color: ${color};
  `,
  summonerDetailContainer: css`
    display: flex;
    height: 110px;
    width: 100%;
  `,
  summonerProfileContaier: css`
    position: relative;
  `,
  level: css`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 5%);
    color: white;
    background-color: #1b1b1b;
    font-size: 13px;
    line-height: 18px;
    width: 40px;
    text-align: center;
    border-radius: 15px;
  `,
  summonerDetail: css`
    width: 105px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `,
  challengeContainer: css`
    width: 100%;
    height: 77px;
    display: flex;
    align-items: center;
  `,
  challenge: css`
    width: 214px;
    height: 70px;
    background-color: #202020;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 80px;
    margin: auto;
  `,
  emptyChallenge: css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    filter: brightness(0.35);
  `,
  color: (color: string) => css`
    color: ${color};
  `,
  resetMargin: css`
    margin: 0;
  `,
  fontSize: (size: string) => css`
    font-size: ${size};
  `,
  bold: css`
    font-weight: bold;
  `,
};
