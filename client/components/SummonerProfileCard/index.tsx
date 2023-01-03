import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import Button from '../Button';
import ChallengeIcon from '../ChallengeIcon';
import SummonerProfilePic from '../SummonerProfilePic';
import { style } from './style';

export default function SummonerProfileCard() {
  return (
    <div css={[style.container, style.backgroundColor('#37393A')]}>
      <div css={style.summonerDetailContainer}>
        <div css={style.summonerProfileContaier}>
          <SummonerProfilePic version={'12.13.1'} id={5131} width={100} height={100} />
          <span css={style.level}>123</span>
        </div>
        <div css={style.summonerDetail}>
          <div>
            <p css={[style.color('white'), style.resetMargin, style.bold]}>소환사 이름</p>
            <p css={[style.color('white'), style.resetMargin, style.fontSize('12px')]}>
              최근 업데이트: 어제
            </p>
          </div>
          <Button width="80px" onClick={() => {}}>
            전적 갱신
          </Button>
        </div>
      </div>
      <div css={style.challengeContainer}>
        <div css={style.challenge}>
          <ChallengeIcon
            id={101108}
            tier={'GRANDMASTER'}
            label={'도전과제'}
            value={1234}
            width={50}
            height={50}
          />
          <ChallengeIcon
            id={101101}
            tier={'CHALLENGER'}
            label={'도전과제'}
            value={1234}
            width={50}
            height={50}
          />
          <ChallengeIcon
            id={101106}
            tier={'MASTER'}
            label={'도전과제'}
            value={1234}
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}
