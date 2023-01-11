import { convertEpochToRelativeTime } from '../../utils/time';
import Button from '../Button';
import ChallengeIcon from '../ChallengeIcon';
import SummonerProfilePic from '../SummonerProfilePic';
import { style } from './style';

interface SummonerProfileCardProps {
  profileIconId: number;
  summonerName: string;
  summonerLevel: number;
  modifiedAt: number;
  challenges: Challenge[];
}

export default function SummonerProfileCard({
  profileIconId,
  summonerName,
  summonerLevel,
  modifiedAt,
  challenges,
}: SummonerProfileCardProps) {
  if (challenges.length > 3) throw new Error('challenge는 최대 세개입니다.');

  // TODO: 최근 업데이트 시간(숫자) => ~일 전으로 수정하기

  return (
    <div css={[style.container, style.backgroundColor('#37393A')]}>
      <div css={style.summonerDetailContainer}>
        <div css={style.summonerProfileContaier}>
          <SummonerProfilePic id={profileIconId} width={100} height={100} />
          <span css={style.level}>{summonerLevel}</span>
        </div>
        <div css={style.summonerDetail}>
          <div>
            <p css={[style.color('white'), style.resetMargin, style.bold]}>{summonerName}</p>
            <p css={[style.color('white'), style.resetMargin, style.fontSize('12px')]}>
              최근 업데이트: {convertEpochToRelativeTime(modifiedAt)}
            </p>
          </div>
          <Button width="80px" onClick={() => {}}>
            전적 갱신
          </Button>
        </div>
      </div>
      <div css={style.challengeContainer}>
        <div css={style.challenge}>
          {challenges.map((challenge, idx) => (
            <ChallengeIcon
              key={`challenge-${idx}`}
              id={challenge?.challengeId}
              tier={challenge?.level}
              value={challenge?.value}
              width={50}
              height={50}
            />
          ))}
          {Array(3 - challenges.length)
            .fill(0)
            .map((_, idx) => (
              <div
                css={[style.emptyChallenge, style.backgroundColor('#37393A')]}
                key={`challenge-empth-${idx}`}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
