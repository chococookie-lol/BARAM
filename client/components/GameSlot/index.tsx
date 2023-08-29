import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { matchStateFamily, matchStatisticState } from '../../states/gameSlot';
import { convertEpochToDate, secondsToString } from '../../utils/time';
import { detailStyle, style } from './style';
import DownArrow from '../../assets/downArrow.svg';
import GameSlotSummary from './GameSlotSummary';
import GameSlotDetail from './GameSlotDetail';
import { getMatchStatistic } from '../../utils/matchStatistic';

interface GameSlotProps {
  matchId: number;
  puuid: string;
}

export default function GameSlot(props: GameSlotProps) {
  return (
    <React.Suspense fallback={<div css={style.fallback}></div>}>
      <Slot {...props} />
    </React.Suspense>
  );
}

function Slot({ matchId, puuid }: GameSlotProps) {
  const { match, version, gameContribution, blueTeamWin } = useRecoilValue(
    matchStateFamily(matchId),
  );
  const [, setMatchStatistics] = useRecoilState(matchStatisticState);
  const { info } = match;
  const { participants, gameDuration } = info;
  const timeString = secondsToString(gameDuration);

  const me = participants.find((e) => e.puuid == puuid);
  if (!me) throw Error("can't find summoner in match");

  const contribution = match.info.teams.find((team) => team.teamId === me.teamId)?.contribution;
  if (!contribution) throw new Error('contribution does not exist');

  const [expand, setExpand] = useState<boolean>(false);
  const [rendered, setRendered] = useState<boolean>(false);

  // to set match statistics
  useEffect(() => {
    setMatchStatistics((statistics) => {
      const newStatistics = { ...statistics };
      newStatistics[match.metadata.matchId] = getMatchStatistic(match, puuid);
      return newStatistics;
    });
  }, [match, puuid, setMatchStatistics]);

  return (
    <div css={style.parent}>
      <div css={style.container(me.win, expand)}>
        <div css={style.header(me.win, expand)}>
          <div css={style.headerTitle}>{me.win ? '승리' : '패배'}</div>
          <div>{timeString}</div>
          <div>&nbsp;</div>
          <div>{convertEpochToDate(info.gameStartTimestamp)}</div>
        </div>
        <div css={style.gameSummaryContainer}>
          <GameSlotSummary
            version={version}
            me={me}
            teamContribution={contribution}
            gameContribution={gameContribution}
          />
        </div>
        <div
          css={style.expand}
          onClick={() => {
            setRendered(true);
            setExpand(!expand);
          }}
        >
          <div css={[style.seperator, style.stickLeft, style.middle]} />
          <DownArrow css={style.downArrow(expand)} />
        </div>
      </div>
      <div css={detailStyle.visible(expand)}>
        {rendered ? (
          <GameSlotDetail
            participants={participants}
            version={version}
            blueWin={blueTeamWin}
            gameContribution={gameContribution}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
