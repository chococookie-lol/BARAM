import { css } from '@emotion/react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { Theme } from '../../styles/theme';
import Github from '/assets/github-mark.svg';

const style = (theme: Theme) => css`
  height: 40px;
  width: auto;
  margin-top: 30px;
  padding: 0 40px 0 40px;

  text-align: center;
  * {
    text-decoration: none;
    display: inline;
    line-height: 40px;
    font-size: 15px;
    color: ${theme.foreground};
    margin-right: 15px;
  }
  svg {
    vertical-align: middle;
    margin-right: 5px;
    height: 20px;
  }
`;

export default function Footer() {
  const { theme } = useGlobalTheme();
  const github = 'https://github.com/chococookie-lol/BARAM/';
  return (
    <div css={style(theme)}>
      <span>© 2023 BARAM</span>
      <span>·</span>
      <Github href={github} />
      <a href={github}>Github</a>
    </div>
  );
}
