import { css } from '@emotion/react';
import { Theme } from '../../styles/theme';

export const style = {
  container: (theme: Theme, win: boolean) => css`
    position: relative;
    height: 120px;
    width: 777px;
    background-color: ${win ? theme.blue4 : theme.red4};
    border-radius: 10px;
    color: ${theme.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
    * {
      box-sizing: border-box;
      overflow: hidden;
    }
  `,
  header: (theme: Theme, win: boolean) => css`
    float: left;
    width: 70px;
    height: 100%;
    border-radius: 10px 0 0 10px;
    font-size: 11px;
    padding: 8px 6px;
    background-color: ${win ? theme.blue3 : theme.red2};
  `,
  bottomRight: css`
    position: absolute;
    right: 0;
    bottom: 0;
  `,
  level: css`
    background-color: #000000ce;
    width: 20px;
    line-height: 20px;
    border-radius: 50%;
    font-size: 9px;
    vertical-align: middle;
    text-align: center;
  `,
  middle: css`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  `,
  item: css`
    float: left;
    position: relative;
  `,
  headerTitle: css`
    font-weight: bold;
    font-size: 15px;
  `,
  summary: css`
    position: relative;
    display: block;
    margin-bottom: 3px;
    height: 60px;
    & > * {
      margin-right: 3px;
      position: relative;
      display: block;
      float: left;
    }
  `,
  kdaContainer: css`
    margin: 0;
    float: none;
  `,
  kda: css`
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    display: block;
    color: black;
    * {
      display: inline;
    }
    p {
      color: red;
    }
  `,
  kdaverage: css`
    margin-block: 0;
    font-weight: bold;
    text-align: center;
    display: block;
    font-size: 14px;
    color: grey;
  `,
  seperator: css`
    background-color: #cccccc;
    width: 1px;
    border-radius: 1px;
    height: 98px;
  `,
  champion: css`
    font-size: 0px;
  `,
  expand: css`
    position: relative;
    float: right;
    width: 40px;
    height: 100%;
    border-radius: 0 10px 10px 0;
  `,
  stickLeft: css`
    position: absolute;
    left: 0;
  `,
};
