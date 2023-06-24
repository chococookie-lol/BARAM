import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { GLOBAL_COLOR } from '../../utils/color';
import ChampionPic from '../ChampionPic';
import Doughnut from '../Doughnut';
import ItemStrip from '../ItemStrip';
import PercentageStatistics from '../PercentageStatistics';
import RelativeStatistics from '../RelativeStatistics';
import RuneIcon from '../RuneIcon';
import SpellStrip from '../SpellStrip';
import { style } from './style';

interface GameSlotSummaryProps {
  version: string;
  me: Participant;
  teamContribution: TeamContribution;
  gameContribution: GameContribution;
}

export default function GameSlotSummary({
  version,
  me,
  teamContribution,
  gameContribution,
}: GameSlotSummaryProps) {
  const { theme } = useGlobalTheme();
  const championId = me.championId;
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

  const dealMaxOffset = Math.abs(teamContribution.max.dealt - teamContribution.average.dealt);
  const dealValue = me.totalDamageDealtToChampions;
  const goldMaxOffset = Math.abs(teamContribution.max.gold - teamContribution.average.gold);
  const goldValue = me.goldEarned;
  const deathMaxOffset = Math.abs(teamContribution.max.death - teamContribution.average.death);
  const deathValue = me.deaths;
  const csMaxOffset = Math.abs(teamContribution.max.cs - teamContribution.average.cs);
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
        <div css={[style.bottomRight, style.level, style.front]}>{level}</div>
        <ChampionPic championKey={championId} version={version} width={80} height={80} />
      </div>
      <div css={[style.item]}>
        <div css={style.summary}>
          <div css={style.middle}>
            <SpellStrip
              version={version}
              spells={spells}
              width={25}
              height={25}
              direction={'vertical'}
              padding={3}
            />
          </div>
          <div css={style.middle}>
            <div css={[style.bottomRight, style.front]}>
              <RuneIcon version={version} styleId={secondaryRuneStyle} width={20} height={20} />
            </div>
            <RuneIcon
              version={version}
              styleId={primaryRuneStyle}
              runeId={primaryRune}
              width={55}
              height={55}
            />
          </div>
          <div css={[style.kdaContainer, style.middle]}>
            <div css={style.kda}>
              {k}/<p>{d}</p>/{a}
            </div>
            <p css={style.kdaverage}>{kda}</p>
          </div>
        </div>
        <ItemStrip items={items} version={version} width={25} height={25} padding={3} />
      </div>
      <div css={[style.item]}>
        <div css={style.seperator} />
      </div>
      <div css={[style.item]}>
        <PercentageStatistics
          padding={6}
          dealtPercent={me.contributionPercentage.dealt}
          dealtAmount={dealValue}
          healPercent={me.contributionPercentage.heal}
          healAmount={healValue}
          damagedPercent={me.contributionPercentage.damaged}
          damagedAmount={damagedValue}
          deathPercent={me.contributionPercentage.death}
          deathAmount={deathValue}
          color={{ foreground: theme.foreground, background: theme.background }}
          percentMax={gameContribution.percentageMax}
        />
      </div>
      <div css={[style.item]}>
        <RelativeStatistics
          dealAverage={teamContribution.average.dealt}
          dealMaxOffset={dealMaxOffset}
          dealValue={dealValue}
          goldAverage={teamContribution.average.gold}
          goldMaxOffset={goldMaxOffset}
          goldValue={goldValue}
          deathAverage={teamContribution.average.death}
          deathMaxOffset={deathMaxOffset}
          deathValue={deathValue}
          csAverage={teamContribution.average.cs}
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
