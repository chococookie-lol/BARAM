import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { matches } from '../../states/gameSlot';
import { convertEpochToDate, secondsToString } from '../../utils/time';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { detailStyle, style } from './style';
import DownArrow from '../../assets/downArrow.svg';
import GameSlotSummary from './GameSlotSummary';
import GameSlotDetail from './GameSlotDetail';

interface GameSlotProps {
  matchId: number;
  puuid: string;
}

export default function GameSlot(props: GameSlotProps) {
  return (
    <React.Suspense fallback={<p>loading...</p>}>
      <Slot {...props} />
    </React.Suspense>
  );
}

function Slot({ matchId, puuid }: GameSlotProps) {
  const { match, version, gameContribution, blueTeamWin } = useRecoilValue(matches(matchId));
  const { info } = match;
  const { participants, gameDuration } = info;
  const timeString = secondsToString(gameDuration);

  const me = participants.find((e) => e.puuid == puuid);
  if (!me) throw Error("can't find summoner in match");

  const contribution = match.info.teams.find((team) => team.teamId === me.teamId)?.contribution;
  if (!contribution) throw new Error('contribution does not exist');

  const [expand, setExpand] = useState<boolean>(false);
  const [rendered, setRendered] = useState<boolean>(false);

  const { theme } = useGlobalTheme();

  return (
    <div css={style.parent}>
      <div css={style.container(theme, me.win, expand)}>
        <div css={style.header(theme, me.win, expand)}>
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
