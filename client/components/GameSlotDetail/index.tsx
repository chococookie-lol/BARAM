import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import ChampionPic from '../ChampionPic';
import ItemStrip from '../ItemStrip';
import Percentage from '../Percentage';
import PercentageBar from '../PercentageBar';
import RuneIcon from '../RuneIcon';
import SpellStrip from '../SpellStrip';
import { style } from './style';
import { GLOBAL_COLOR } from '../../utils/color';

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
    <table css={style.tableContainer(theme, teamId, win)}>
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
    <tr css={style.container}>
      <td>
        <div css={style.champion}>
          <div css={style.level}>{participant.champLevel}</div>
          <ChampionPic championName={participant.championName} width={32} height={32} />
        </div>
        <div css={style.name}>{participant.summonerName}</div>
      </td>
      <td css={style.summonerSettings}>
        <SpellStrip
          spells={[participant.summoner1Id, participant.summoner2Id]}
          width={15}
          height={15}
          direction={'vertical'}
          padding={1}
        />
        <div css={style.runes}>
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
        <div css={style.kdaContainer}>
          <div css={style.kda}>
            {participant.kills}/<p>{participant.deaths}</p>/{participant.assists}
          </div>
          <p css={style.kdaverage}>
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
      <td css={style.percentage}>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.accent1}
          textColor={theme.background}
          percent={participant.participation.dealt}
          value={participant.contribution.dealt}
        />
      </td>
      <td css={style.percentage}>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.red3}
          textColor={theme.background}
          percent={participant.participation.damaged}
          value={participant.contribution.damaged}
        />
      </td>
      <td css={style.percentage}>
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

export default GameSlotDetail;
