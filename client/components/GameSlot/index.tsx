import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { GLOBAL_COLOR } from '../../utils/color';
import ChampionPic from '../ChampionPic';
import Doughnut from '../Doughnut';
import ItemStrip from '../ItemStrip';
import PercentageStatistics from '../PercentageStatistics';
import RelativeStatistics from '../RelativeStatistics';
import RuneIcon from '../RuneIcon';
import SpellStrip from '../SpellStrip';
import { secondsToString } from '../../utils/time';
import { style, detailStyle } from './style';
import { useState } from 'react';
import Percentage from '../Percentage';
import PercentageBar from '../PercentageBar';

interface GameSlotProps {
  matchData: Match;
  puuid: string;
}

interface GameSlotSummaryProps {
  me: Participant;
  participants: Participant[];
  contribution: TeamContribution;
}

interface GameSlotRowProps {
  participant: Participant;
}

interface GameSlotTableProps {
  win: boolean;
  teamId: 100 | 200;
  participants: Participant[];
}

interface GameSlotDetailProps {
  participants: Participant[];
  teams: Team[];
}

function GameSlotTable({ win, teamId, participants }: GameSlotTableProps) {
  const { theme } = useGlobalTheme();
  return (
    <table css={detailStyle.tableContainer(theme, teamId, win)}>
      <thead>
        <tr>
          <th>
            <span>{win ? '승리' : '패배'}</span> ({teamId === 100 ? '블루' : '레드'}팀)
          </th>
          <th>룬</th>
          <th>KDA</th>
          <th>빌드</th>
          <th>준 피해량</th>
          <th>받은 피해량</th>
          <th>딜 유형</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((e, i) => {
          return <GameSlotRow key={i} participant={e} />;
        })}
      </tbody>
    </table>
  );
}

function GameSlotRow({ participant }: GameSlotRowProps) {
  const primaryPerk = participant.perks.styles.find((e) => e.description == 'primaryStyle');
  const subPerk = participant.perks.styles.find((e) => e.description == 'subStyle');
  if (!primaryPerk || !subPerk) throw 'perk not properly formatted';
  const { theme } = useGlobalTheme();
  return (
    <tr css={detailStyle.container}>
      <td>
        <div css={detailStyle.champion}>
          <div css={detailStyle.level}>{participant.champLevel}</div>
          <ChampionPic championName={participant.championName} width={32} height={32} />
        </div>
        <div css={detailStyle.name}>{participant.summonerName}</div>
      </td>
      <td css={detailStyle.summonerSettings}>
        <SpellStrip
          spells={[participant.summoner1Id, participant.summoner2Id]}
          width={15}
          height={15}
          direction={'vertical'}
          padding={1}
        />
        <div css={detailStyle.runes}>
          <RuneIcon
            styleId={primaryPerk.style}
            runeId={primaryPerk.selections[0].perk}
            width={15}
            height={15}
          />
          <RuneIcon styleId={subPerk.style} width={15} height={15} />
        </div>
      </td>
      <td>
        <div css={detailStyle.kdaContainer}>
          <div css={detailStyle.kda}>
            {participant.kills}/<p>{participant.deaths}</p>/{participant.assists}
          </div>
          <p css={detailStyle.kdaverage}>
            {((participant.kills + participant.assists) / participant.deaths).toFixed(2)}
          </p>
        </div>
      </td>
      <td>
        <ItemStrip
          items={[
            participant.item0,
            participant.item1,
            participant.item2,
            participant.item3,
            participant.item4,
            participant.item5,
          ]}
          width={21}
          height={21}
          padding={1}
        />
      </td>
      <td css={detailStyle.percentage}>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.accent1}
          textColor={theme.background}
          percent={participant.participation.dealt}
          value={participant.contribution.dealt}
        />
      </td>
      <td css={detailStyle.percentage}>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.red3}
          textColor={theme.background}
          percent={participant.participation.damaged}
          value={participant.contribution.damaged}
        />
      </td>
      <td css={detailStyle.percentage}>
        <PercentageBar
          amounts={[
            participant.physicalDamageDealtToChampions,
            participant.magicDamageDealtToChampions,
            participant.trueDamageDealtToChampions,
          ]}
          colors={[GLOBAL_COLOR.red1, GLOBAL_COLOR.blue1, GLOBAL_COLOR.white]}
        />
      </td>
    </tr>
  );
}

function GameSlotDetail({ participants, teams }: GameSlotDetailProps) {
  const red: Participant[] = [];
  const blue: Participant[] = [];
  participants.forEach((e) => {
    if (e.teamId == 100) blue.push(e);
    else red.push(e);
  });
  const bluewin = teams[0].win;
  return (
    <div>
      <GameSlotTable win={bluewin} teamId={100} participants={blue} />
      <GameSlotTable win={!bluewin} teamId={200} participants={red} />
    </div>
  );
}

function GameSlotSummary({ me, participants, contribution }: GameSlotSummaryProps) {
  const { theme } = useGlobalTheme();
  const championName = me.championName;
  const level = me.champLevel;
  const spells = [me.summoner1Id, me.summoner2Id];
  const items = [me.item0, me.item1, me.item2, me.item3, me.item4, me.item5];
  const primaryPerk = me.perks.styles.find((e) => e.description == 'primaryStyle');
  const subPerk = me.perks.styles.find((e) => e.description == 'subStyle');
  if (!primaryPerk || !subPerk) throw 'perk not properly formatted';
  const primaryRuneStyle = primaryPerk.style;
  const primaryRune = primaryPerk.selections[0].perk;
  const secondaryRuneStyle = subPerk.style;
  const k = me.kills;
  const d = me.deaths;
  const a = me.assists;
  const { dealtAverage, dealtMax, goldAverage, goldMax, deathAverage, deathMax, csAverage, csMax } =
    contribution;

  const dealMaxOffset = Math.abs(dealtMax - dealtAverage);
  const dealValue = me.totalDamageDealtToChampions;
  const goldMaxOffset = Math.abs(goldMax - goldAverage);
  const goldValue = me.goldEarned;
  const deathMaxOffset = Math.abs(deathMax - deathAverage);
  const deathValue = me.deaths;
  const csMaxOffset = Math.abs(csMax - csAverage);
  const csValue = me.totalMinionsKilled;
  const healValue = me.contribution.heal;
  const damagedValue = me.contribution.damaged;
  const dealMagic = me.magicDamageDealtToChampions;
  const dealPhysical = me.physicalDamageDealtToChampions;
  const dealTrue = me.trueDamageDealtToChampions;

  const kda = ((k + a) / d).toFixed(2);

  return (
    <div css={style.gameSummary}>
      <div css={[style.item, style.champion]}>
        <div css={[style.bottomRight, style.level]}>{level}</div>
        <ChampionPic championName={championName} width={80} height={80} />
      </div>
      <div css={[style.item]}>
        <div css={style.summary}>
          <div css={style.middle}>
            <SpellStrip spells={spells} width={25} height={25} direction={'vertical'} padding={3} />
          </div>
          <div css={style.middle}>
            <div css={style.bottomRight}>
              <RuneIcon styleId={secondaryRuneStyle} width={20} height={20} />
            </div>
            <RuneIcon styleId={primaryRuneStyle} runeId={primaryRune} width={55} height={55} />
          </div>
          <div css={[style.kdaContainer, style.middle]}>
            <div css={style.kda}>
              {k}/<p>{d}</p>/{a}
            </div>
            <p css={style.kdaverage}>{kda}</p>
          </div>
        </div>
        <ItemStrip items={items} width={25} height={25} padding={3} />
      </div>
      <div css={[style.item]}>
        <div css={style.seperator} />
      </div>
      <div css={[style.item]}>
        <PercentageStatistics
          padding={6}
          dealtPercent={me.participation.dealt}
          dealtAmount={dealValue}
          healPercent={me.participation.heal}
          healAmount={healValue}
          damagedPercent={me.participation.damaged}
          damagedAmount={damagedValue}
          deathPercent={me.participation.death}
          deathAmount={deathValue}
          color={{ foreground: theme.foreground, background: theme.background }}
        />
      </div>
      <div css={[style.item]}>
        <RelativeStatistics
          dealAverage={dealtAverage}
          dealMaxOffset={dealMaxOffset}
          dealValue={dealValue}
          goldAverage={goldAverage}
          goldMaxOffset={goldMaxOffset}
          goldValue={goldValue}
          deathAverage={deathAverage}
          deathMaxOffset={deathMaxOffset}
          deathValue={deathValue}
          csAverage={csAverage}
          csMaxOffset={csMaxOffset}
          csValue={csValue}
        />
      </div>
      <div css={[style.item]}>
        <Doughnut
          val={[dealPhysical, dealTrue, dealMagic]}
          title={'딜 유형'}
          label={['물리', '고정', '마법']}
          color={[GLOBAL_COLOR.red1, 'white', GLOBAL_COLOR.blue1]}
          textColor={'black'}
        />
      </div>
    </div>
  );
}

function GameSlot({ matchData, puuid }: GameSlotProps) {
  const { info } = matchData;
  const { participants, gameDuration } = info;
  const me = participants.find((e) => e.puuid == puuid);
  if (!me) throw Error("can't find summoner in match");

  const win = me.win;
  const timeString = secondsToString(gameDuration);

  const contribution = matchData.info.teams.find((team) => team.teamId === me.teamId)?.contribution;
  if (!contribution) throw new Error('contribution not exists');

  const [expand, setExpand] = useState<boolean>(false);
  const { theme } = useGlobalTheme();

  return (
    <div css={style.parent}>
      <div css={style.container(theme, win, expand)}>
        <div css={style.header(theme, win, expand)}>
          <div css={style.headerTitle}>{win ? '승리' : '패배'}</div>
          <div>{timeString}</div>
        </div>
        <div css={style.gameSummaryContainer}>
          <GameSlotSummary me={me} participants={participants} contribution={contribution} />
        </div>
        <div css={style.expand} onClick={() => setExpand(!expand)}>
          <div css={[style.seperator, style.stickLeft, style.middle]} />
          {/* TODO: down arrow*/}
        </div>
      </div>
      <div>
        {expand ? <GameSlotDetail participants={participants} teams={info.teams} /> : <></>}
      </div>
    </div>
  );
}

export default GameSlot;
