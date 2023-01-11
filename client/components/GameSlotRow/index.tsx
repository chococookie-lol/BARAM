import { css } from '@emotion/react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import ChampionPic from '../ChampionPic';
import ItemStrip from '../ItemStrip';
import Percentage from '../Percentage';
import RuneIcon from '../RuneIcon';
import SpellStrip from '../SpellStrip';

interface GameSlotRowProps {
  participant: Participant;
}

const style = {
  container: css`
    position: relative;
    height: 33px;
    * {
      box-sizing: border-box;
      overflow: hidden;
    }
  `,
  middle: css`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  `,
  champion: css`
    margin-left: 2px;
    float: left;
    font-size: 0;
    position: relative;
  `,
  level: css`
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #000000ce;
    color: white;
    width: 15px;
    line-height: 15px;
    border-radius: 50%;
    font-size: 9px;
    vertical-align: middle;
    text-align: center;
  `,
  name: css`
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 4px;
    line-height: 33px;
    font-size: 12px;
  `,
  summonerSettings: css`
    & > div {
      float: left;
    }
  `,
  runes: css`
    margin-left: 1px;
    margin-top: -1px;
    font-size: 0;
    & > * {
      display: block;
      margin-top: 1px;
    }
  `,
  kdaContainer: css`
    margin: 0;
    float: none;
  `,
  kda: css`
    font-weight: bold;
    font-size: 11px;
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
    font-size: 10px;
    color: #383838;
  `,
  percentage: css`
    text-align: center;
    & > div {
      display: inline-block;
    }
  `,
};

function GameSlotRow({ participant }: GameSlotRowProps) {
  const primaryPerk = participant.perks.styles.find((e) => e.description == 'primaryStyle');
  const subPerk = participant.perks.styles.find((e) => e.description == 'subStyle');
  if (!primaryPerk || !subPerk) throw 'perk not properly formatted';
  const { theme } = useGlobalTheme();
  console.log(participant.contribution);
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
        <Percentage
          backgroundColor={theme.foreground}
          foregroundColor={theme.red1}
          textColor={theme.background}
          percent={1}
          value={100}
        />
      </td>
    </tr>
  );
}

export default GameSlotRow;
