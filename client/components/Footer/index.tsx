import { css, Theme } from '@emotion/react';
import Github from '/assets/github-mark.svg';

const style = (theme: Theme) => css`
  height: 100px;
  width: auto;
  margin-top: 30px;
  padding: 0 40px 0 40px;
  user-select: none;

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
  p {
    margin: 0;
    line-height: 40px;
    font-size: 12px;
  }
`;

export default function Footer() {
  const github = 'https://github.com/chococookie-lol/BARAM/';
  return (
    <div css={style}>
      <span>© 2023 BARAM</span>
      <span>·</span>
      <a href="mailto: lol.chococookie@gmail.com">lol.chococookie@gmail.com</a>
      <span>·</span>
      <Github href={github} />
      <a href={github}>Github</a>
      <br />
      <p>
        BARAM isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of
        Riot Games or anyone officially involved in producing or managing Riot Games properties.
        Riot Games, and all associated properties are trademarks or registered trademarks of Riot
        Games, Inc.
      </p>
    </div>
  );
}
