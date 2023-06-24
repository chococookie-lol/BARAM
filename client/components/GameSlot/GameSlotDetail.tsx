import Link from 'next/link';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { GLOBAL_COLOR } from '../../utils/color';
import ChampionPic from '../ChampionPic';
import ItemStrip from '../ItemStrip';
import Percentage from '../Percentage';
import PercentageBar from '../PercentageBar';
import { detailStyle, style } from './style';
import SpellStrip from '../SpellStrip';
import RuneIcon from '../RuneIcon';
import { rankToString } from '../../utils/matchStatistic';

interface GameSlotDetailProps {
  version: string;
  participants: Participant[];
  blueWin: boolean;
  gameContribution: GameContribution;
}

export default function GameSlotDetail({
  version,
  participants,
  blueWin,
  gameContribution,
}: GameSlotDetailProps) {
  const red: Participant[] = [];
  const blue: Participant[] = [];
  participants.forEach((e) => {
    if (e.teamId == 100) blue.push(e);
    else red.push(e);
  });

  return (
    <div>
      <GameSlotTable
        version={version}
        win={blueWin}
        teamId={100}
        participants={blue}
        gameContribution={gameContribution}
      />
      <GameSlotTable
        version={version}
        win={!blueWin}
        teamId={200}
        participants={red}
        gameContribution={gameContribution}
      />
    </div>
  );
}

interface GameSlotTableProps {
  version: string;
  win: boolean;
  teamId: 100 | 200;
  participants: Participant[];
  gameContribution: GameContribution;
}

function GameSlotTable({
  version,
  win,
  teamId,
  participants,
  gameContribution,
}: GameSlotTableProps) {
  const { theme } = useGlobalTheme();
  return (
    <table css={detailStyle.tableContainer(theme, teamId, win)}>
      <thead>
        <tr>
          <th css={detailStyle.thFirst(theme, win)}>
            <span>{win ? '승리' : '패배'}</span> ({teamId === 100 ? '블루' : '레드'}팀)
          </th>
          <th css={detailStyle.width('5%')}>룬</th>
          <th css={detailStyle.width('7%')}>KDA</th>
          <th css={detailStyle.width('18%')}>빌드</th>
          <th css={detailStyle.width('16%')}>준 피해량</th>
          <th css={detailStyle.width('16%')}>받은 피해량</th>
          <th css={detailStyle.width('16%')}>딜 유형</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((e, i) => {
          return (
            <GameSlotRow
              version={version}
              key={i}
              participant={e}
              gameContribution={gameContribution}
            />
          );
        })}
      </tbody>
    </table>
  );
}

interface GameSlotRowProps {
  version: string;
  participant: Participant;
  gameContribution: GameContribution;
}

function GameSlotRow({ version, participant, gameContribution }: GameSlotRowProps) {
  const primaryPerk = participant.perks.styles.find((e) => e.description == 'primaryStyle');
  const subPerk = participant.perks.styles.find((e) => e.description == 'subStyle');
  if (!primaryPerk || !subPerk) throw 'perk not properly formatted';
  const { theme } = useGlobalTheme();

  const teamScale =
    participant.teamId == 100 ? gameContribution.blueScale : gameContribution.redScale;

  return (
    <tr css={detailStyle.container}>
      <td>
        <div css={detailStyle.champion}>
          <div css={[detailStyle.level, style.front]}>{participant.champLevel}</div>
          <ChampionPic
            championKey={participant.championId}
            version={version}
            width={32}
            height={32}
          />
        </div>
        <div css={detailStyle.name}>
          <span css={detailStyle.visibleInline(!isNaN(participant.contributionRank))}>
            {rankToString(participant.contributionRank)}
          </span>
          <Link href={`/summoners/${participant.summonerName}`} prefetch={false}>
            {participant.summonerName}
          </Link>
        </div>
      </td>
      <td css={detailStyle.summonerSettings}>
        <div>
          <SpellStrip
            version={version}
            spells={[participant.summoner1Id, participant.summoner2Id]}
            width={15}
            height={15}
            direction={'vertical'}
            padding={1}
          />
          <div css={detailStyle.runes}>
            <RuneIcon
              version={version}
              styleId={primaryPerk.style}
              runeId={primaryPerk.selections[0].perk}
              width={15}
              height={15}
            />
            <RuneIcon version={version} styleId={subPerk.style} width={15} height={15} />
          </div>
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
          version={version}
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
          percent={participant.contributionPercentage.dealt}
          value={participant.contribution.dealt}
          maxPercent={gameContribution.percentageMax.dealt}
          scale={teamScale.dealt}
        />
      </td>
      <td css={detailStyle.percentage}>
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.red3}
          textColor={theme.background}
          percent={participant.contributionPercentage.damaged}
          value={participant.contribution.damaged}
          maxPercent={gameContribution.percentageMax.damaged}
          scale={teamScale.damaged}
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
