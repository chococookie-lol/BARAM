import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { GLOBAL_COLOR } from '../../utils/color';
import ChampionPic from '../ChampionPic';
import Doughnut from '../Doughnut';
import ItemStrip from '../ItemStrip';
import PercentageStatistics from '../PercentageStatistics';
import RelativeStatistics from '../RelativeStatistics';
import RuneIcon from '../RuneIcon';
import SpellStrip from '../SpellStrip';
import { secondsToString, totalValueHelper } from './helper';
import { style } from './style';

interface GameSlotProps {
  matchData: Match;
  puuid: string;
}

function GameSlot({ matchData, puuid }: GameSlotProps) {
  const { info } = matchData;
  const { participants, gameDuration } = info;
  const version = '12.23.1';

  const { theme } = useGlobalTheme();
  const me = participants.find((e) => e.puuid == puuid);
  if (!me) throw Error("can't find summoner in match");
  const team = me.teamId == 100 ? 'blue' : 'red';
  const win = me.win;
  const championName = me.championName;
  const timeString = secondsToString(gameDuration);
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

  const {
    totalTank,
    totalDeal,
    totalDeath,
    totalHeal,
    dealAverage,
    dealMax,
    goldAverage,
    goldMax,
    deathAverage,
    deathMax,
    csAverage,
    csMax,
  } = totalValueHelper(info.participants)[team];

  const dealMaxOffset = Math.abs(dealMax - dealAverage);
  const dealValue = me.totalDamageDealtToChampions;
  const goldMaxOffset = Math.abs(goldMax - goldAverage);
  const goldValue = me.goldEarned;
  const deathMaxOffset = Math.abs(deathMax - deathAverage);
  const deathValue = me.deaths;
  const csMaxOffset = Math.abs(csMax - csAverage);
  const csValue = me.totalMinionsKilled;
  const healValue = me.totalHealsOnTeammates;
  const tankValue = me.totalDamageTaken;
  const dealMagic = me.magicDamageDealtToChampions;
  const dealPhysical = me.physicalDamageDealtToChampions;
  const dealTrue = me.trueDamageDealtToChampions;

  const kda = ((k + a) / d).toFixed(2);

  return (
    <div css={style.container(theme, win)}>
      <div css={style.header(theme, win)}>
        <div css={style.headerTitle}>{win ? '승리' : '패배'}</div>
        <div>{timeString}</div>
      </div>
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
          dealtPercent={dealValue / totalDeal}
          dealtAmount={dealValue}
          healPercent={healValue / totalHeal}
          healAmount={healValue}
          damagedPercent={tankValue / totalTank}
          damagedAmount={tankValue}
          deathPercent={deathValue / totalDeath}
          deathAmount={deathValue}
          color={{ foreground: theme.foreground, background: theme.background }}
        />
      </div>
      <div css={[style.item]}>
        <RelativeStatistics
          dealAverage={dealAverage}
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
      <div css={style.expand}>
        <div css={[style.seperator, style.stickLeft, style.middle]} />
        {/* TODO: down arrow and expand onclick */}
      </div>
    </div>
  );
}

export default GameSlot;
