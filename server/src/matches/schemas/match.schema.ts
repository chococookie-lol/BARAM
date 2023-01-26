import { Document, HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type MatchDocument = HydratedDocument<Match>;

@Schema({ id: false, _id: false })
class Metadata {
  @Prop({ required: true })
  dataVersion: string;

  @Prop({ required: true })
  matchId: string;

  @Prop({ required: true })
  participants: string[];
}

const metaDataSchema = SchemaFactory.createForClass(Metadata);

@Schema({ id: false, _id: false })
class Challenges {
  @Prop({ required: true })
  '12AssistStreakCount': number;

  @Prop({ required: true })
  abilityUses: number;

  @Prop({ required: true })
  acesBefore15Minutes: number;

  @Prop({ required: true })
  alliedJungleMonsterKills: number;

  @Prop({ required: true })
  baronTakedowns: number;

  @Prop({ required: true })
  blastConeOppositeOpponentCount: number;

  @Prop({ required: true })
  bountyGold: number;

  @Prop({ required: true })
  buffsStolen: number;

  @Prop({ required: true })
  completeSupportQuestInTime: number;

  @Prop({ required: true })
  controlWardsPlaced: number;

  @Prop({ required: true })
  damagePerMinute: number;

  @Prop({ required: true })
  damageTakenOnTeamPercentage: number;

  @Prop({ required: true })
  dancedWithRiftHerald: number;

  @Prop({ required: true })
  deathsByEnemyChamps: number;

  @Prop({ required: true })
  dodgeSkillShotsSmallWindow: number;

  @Prop({ required: true })
  doubleAces: number;

  @Prop({ required: true })
  dragonTakedowns: number;

  @Prop({ required: true })
  earlyLaningPhaseGoldExpAdvantage: number;

  @Prop({ required: true })
  effectiveHealAndShielding: number;

  @Prop({ required: true })
  elderDragonKillsWithOpposingSoul: number;

  @Prop({ required: true })
  elderDragonMultikills: number;

  @Prop({ required: true })
  enemyChampionImmobilizations: number;

  @Prop({ required: true })
  enemyJungleMonsterKills: number;

  @Prop({ required: true })
  epicMonsterKillsNearEnemyJungler: number;

  @Prop({ required: true })
  epicMonsterKillsWithin30SecondsOfSpawn: number;

  @Prop({ required: true })
  epicMonsterSteals: number;

  @Prop({ required: true })
  epicMonsterStolenWithoutSmite: number;

  @Prop({ required: true })
  firstTurretKilledTime?: number;

  @Prop({ required: true })
  flawlessAces: number;

  @Prop({ required: true })
  fullTeamTakedown: number;

  @Prop({ required: true })
  gameLength: number;

  @Prop({ required: true })
  getTakedownsInAllLanesEarlyJungleAsLaner: number;

  @Prop({ required: true })
  goldPerMinute: number;

  @Prop({ required: true })
  hadOpenNexus: number;

  @Prop({ required: true })
  highestCrowdControlScore?: number;

  @Prop({ required: true })
  immobilizeAndKillWithAlly: number;

  @Prop({ required: true })
  initialBuffCount: number;

  @Prop({ required: true })
  initialCrabCount: number;

  @Prop({ required: true })
  jungleCsBefore10Minutes: number;

  @Prop({ required: true })
  junglerTakedownsNearDamagedEpicMonster: number;

  @Prop({ required: true })
  kTurretsDestroyedBeforePlatesFall: number;

  @Prop({ required: true })
  kda: number;

  @Prop({ required: true })
  killAfterHiddenWithAlly: number;

  @Prop({ required: true })
  killParticipation: number;

  @Prop({ required: true })
  killedChampTookFullTeamDamageSurvived: number;

  @Prop({ required: true })
  killsNearEnemyTurret: number;

  @Prop({ required: true })
  killsOnOtherLanesEarlyJungleAsLaner: number;

  @Prop({ required: true })
  killsOnRecentlyHealedByAramPack: number;

  @Prop({ required: true })
  killsUnderOwnTurret: number;

  @Prop({ required: true })
  killsWithHelpFromEpicMonster: number;

  @Prop({ required: true })
  knockEnemyIntoTeamAndKill: number;

  @Prop({ required: true })
  landSkillShotsEarlyGame: number;

  @Prop({ required: true })
  laneMinionsFirst10Minutes: number;

  @Prop({ required: true })
  laningPhaseGoldExpAdvantage: number;

  @Prop({ required: true })
  legendaryCount: number;

  @Prop({ required: true })
  lostAnInhibitor: number;

  @Prop({ required: true })
  maxCsAdvantageOnLaneOpponent: number;

  @Prop({ required: true })
  maxKillDeficit: number;

  @Prop({ required: true })
  maxLevelLeadLaneOpponent: number;

  @Prop({ required: true })
  moreEnemyJungleThanOpponent: number;

  @Prop({ required: true })
  multiKillOneSpell: number;

  @Prop({ required: true })
  multiTurretRiftHeraldCount: number;

  @Prop({ required: true })
  multikills: number;

  @Prop({ required: true })
  multikillsAfterAggressiveFlash: number;

  @Prop({ required: true })
  mythicItemUsed?: number;

  @Prop({ required: true })
  outerTurretExecutesBefore10Minutes: number;

  @Prop({ required: true })
  outnumberedKills: number;

  @Prop({ required: true })
  outnumberedNexusKill: number;

  @Prop({ required: true })
  perfectDragonSoulsTaken: number;

  @Prop({ required: true })
  perfectGame: number;

  @Prop({ required: true })
  pickKillWithAlly: number;

  @Prop({ required: true })
  poroExplosions: number;

  @Prop({ required: true })
  quickCleanse: number;

  @Prop({ required: true })
  quickFirstTurret: number;

  @Prop({ required: true })
  quickSoloKills: number;

  @Prop({ required: true })
  riftHeraldTakedowns: number;

  @Prop({ required: true })
  saveAllyFromDeath: number;

  @Prop({ required: true })
  scuttleCrabKills: number;

  @Prop({ required: true })
  shortestTimeToAceFromFirstTakedown?: number;

  @Prop({ required: true })
  skillshotsDodged: number;

  @Prop({ required: true })
  skillshotsHit: number;

  @Prop({ required: true })
  snowballsHit: number;

  @Prop({ required: true })
  soloBaronKills: number;

  @Prop({ required: true })
  soloKills: number;

  @Prop({ required: true })
  stealthWardsPlaced: number;

  @Prop({ required: true })
  survivedSingleDigitHpCount: number;

  @Prop({ required: true })
  survivedThreeImmobilizesInFight: number;

  @Prop({ required: true })
  takedownOnFirstTurret: number;

  @Prop({ required: true })
  takedowns: number;

  @Prop({ required: true })
  takedownsAfterGainingLevelAdvantage: number;

  @Prop({ required: true })
  takedownsBeforeJungleMinionSpawn: number;

  @Prop({ required: true })
  takedownsFirstXMinutes: number;

  @Prop({ required: true })
  takedownsInAlcove: number;

  @Prop({ required: true })
  takedownsInEnemyFountain: number;

  @Prop({ required: true })
  teamBaronKills: number;

  @Prop({ required: true })
  teamDamagePercentage: number;

  @Prop({ required: true })
  teamElderDragonKills: number;

  @Prop({ required: true })
  teamRiftHeraldKills: number;

  @Prop({ required: true })
  threeWardsOneSweeperCount: number;

  @Prop({ required: true })
  tookLargeDamageSurvived: number;

  @Prop({ required: true })
  turretPlatesTaken: number;

  @Prop({ required: true })
  turretTakedowns: number;

  @Prop({ required: true })
  turretsTakenWithRiftHerald: number;

  @Prop({ required: true })
  twentyMinionsIn3SecondsCount: number;

  @Prop({ required: true })
  unseenRecalls: number;

  @Prop({ required: true })
  visionScoreAdvantageLaneOpponent: number;

  @Prop({ required: true })
  visionScorePerMinute: number;

  @Prop({ required: true })
  wardTakedowns: number;

  @Prop({ required: true })
  wardTakedownsBefore20M: number;

  @Prop({ required: true })
  wardsGuarded: number;

  @Prop({ required: true })
  killingSprees?: number;

  @Prop({ required: true })
  highestChampionDamage?: number;
}

const challengesSchema = SchemaFactory.createForClass(Challenges);

@Schema({ id: false, _id: false })
class StatPerks {
  @Prop({ required: true })
  defense: number;

  @Prop({ required: true })
  flex: number;

  @Prop({ required: true })
  offense: number;
}

const statPerksSchema = SchemaFactory.createForClass(StatPerks);

@Schema({ id: false, _id: false })
class Selection {
  @Prop({ required: true })
  perk: number;

  @Prop({ required: true })
  var1: number;

  @Prop({ required: true })
  var2: number;

  @Prop({ required: true })
  var3: number;
}

const selectionSchema = SchemaFactory.createForClass(Selection);

@Schema({ id: false, _id: false })
class Style {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [selectionSchema] })
  selections: Selection[];

  @Prop({ required: true })
  style: number;
}

const styleSchema = SchemaFactory.createForClass(Style);

@Schema({ id: false, _id: false })
class Perks {
  @Prop({ required: true, type: statPerksSchema })
  statPerks: StatPerks;

  @Prop({ required: true, type: [styleSchema] })
  styles: Style[];
}

const perksSchema = SchemaFactory.createForClass(Perks);

@Schema({ id: false, _id: false })
export class Contribution {
  @Prop({ required: true, type: Number })
  dealt = 0;

  @Prop({ required: true, type: Number })
  damaged = 0;

  @Prop({ required: true, type: Number })
  heal = 0;

  @Prop({ required: true, type: Number })
  death = 0;

  @Prop({ required: true, type: Number })
  gold = 0;

  @Prop({ required: true, type: Number })
  cs = 0;

  @Prop({ required: true, type: Number })
  kill = 0;

  @Prop({ required: true, type: Number })
  assist = 0;
}

const contributionSchema = SchemaFactory.createForClass(Contribution);

@Schema({ id: false, _id: false })
class Participant {
  @Prop({ required: true })
  allInPings: number;

  @Prop({ required: true })
  assistMePings: number;

  @Prop({ required: true })
  assists: number;

  @Prop({ required: true })
  baitPings: number;

  @Prop({ required: true })
  baronKills: number;

  @Prop({ required: true })
  basicPings: number;

  @Prop({ required: true })
  bountyLevel: number;

  @Prop({ required: true, type: challengesSchema })
  challenges: Challenges;

  @Prop({ required: true })
  champExperience: number;

  @Prop({ required: true })
  champLevel: number;

  @Prop({ required: true })
  championId: number;

  @Prop({ required: true })
  championName: string;

  @Prop({ required: true })
  championTransform: number;

  @Prop({ required: true })
  commandPings: number;

  @Prop({ required: true })
  consumablesPurchased: number;

  @Prop({ required: true, type: contributionSchema })
  contribution: Contribution;

  @Prop({ required: true, type: contributionSchema })
  contributionPercentage: Contribution;

  @Prop({ required: true, type: contributionSchema })
  contributionPercentageTotal: Contribution;

  @Prop({ required: true })
  damageDealtToBuildings: number;

  @Prop({ required: true })
  damageDealtToObjectives: number;

  @Prop({ required: true })
  damageDealtToTurrets: number;

  @Prop({ required: true })
  damageSelfMitigated: number;

  @Prop({ required: true })
  dangerPings: number;

  @Prop({ required: true })
  deaths: number;

  @Prop({ required: true })
  detectorWardsPlaced: number;

  @Prop({ required: true })
  doubleKills: number;

  @Prop({ required: true })
  dragonKills: number;

  @Prop({ required: true })
  eligibleForProgression: boolean;

  @Prop({ required: true })
  enemyMissingPings: number;

  @Prop({ required: true })
  enemyVisionPings: number;

  @Prop({ required: true })
  firstBloodAssist: boolean;

  @Prop({ required: true })
  firstBloodKill: boolean;

  @Prop({ required: true })
  firstTowerAssist: boolean;

  @Prop({ required: true })
  firstTowerKill: boolean;

  @Prop({ required: true })
  gameEndedInEarlySurrender: boolean;

  @Prop({ required: true })
  gameEndedInSurrender: boolean;

  @Prop({ required: true })
  getBackPings: number;

  @Prop({ required: true })
  goldEarned: number;

  @Prop({ required: true })
  goldSpent: number;

  @Prop({ required: true })
  holdPings: number;

  @Prop({ required: true })
  individualPosition: string;

  @Prop({ required: true })
  inhibitorKills: number;

  @Prop({ required: true })
  inhibitorTakedowns: number;

  @Prop({ required: true })
  inhibitorsLost: number;

  @Prop({ required: true })
  item0: number;

  @Prop({ required: true })
  item1: number;

  @Prop({ required: true })
  item2: number;

  @Prop({ required: true })
  item3: number;

  @Prop({ required: true })
  item4: number;

  @Prop({ required: true })
  item5: number;

  @Prop({ required: true })
  item6: number;

  @Prop({ required: true })
  itemsPurchased: number;

  @Prop({ required: true })
  killingSprees: number;

  @Prop({ required: true })
  kills: number;

  @Prop({ required: true })
  lane: string;

  @Prop({ required: true })
  largestCriticalStrike: number;

  @Prop({ required: true })
  largestKillingSpree: number;

  @Prop({ required: true })
  largestMultiKill: number;

  @Prop({ required: true })
  longestTimeSpentLiving: number;

  @Prop({ required: true })
  magicDamageDealt: number;

  @Prop({ required: true })
  magicDamageDealtToChampions: number;

  @Prop({ required: true })
  magicDamageTaken: number;

  @Prop({ required: true })
  needVisionPings: number;

  @Prop({ required: true })
  neutralMinionsKilled: number;

  @Prop({ required: true })
  nexusKills: number;

  @Prop({ required: true })
  nexusLost: number;

  @Prop({ required: true })
  nexusTakedowns: number;

  @Prop({ required: true })
  objectivesStolen: number;

  @Prop({ required: true })
  objectivesStolenAssists: number;

  @Prop({ required: true })
  onMyWayPings: number;

  @Prop({ required: true })
  participantId: number;

  @Prop({ required: true })
  pentaKills: number;

  @Prop({ required: true, type: perksSchema })
  perks: Perks;

  @Prop({ required: true })
  physicalDamageDealt: number;

  @Prop({ required: true })
  physicalDamageDealtToChampions: number;

  @Prop({ required: true })
  physicalDamageTaken: number;

  @Prop({ required: true })
  profileIcon: number;

  @Prop({ required: true })
  pushPings: number;

  @Prop({ required: true })
  puuid: string;

  @Prop({ required: true })
  quadraKills: number;

  @Prop({ required: true })
  riotIdName: string;

  @Prop({ required: true })
  riotIdTagline: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  sightWardsBoughtInGame: number;

  @Prop({ required: true })
  spell1Casts: number;

  @Prop({ required: true })
  spell2Casts: number;

  @Prop({ required: true })
  spell3Casts: number;

  @Prop({ required: true })
  spell4Casts: number;

  @Prop({ required: true })
  summoner1Casts: number;

  @Prop({ required: true })
  summoner1Id: number;

  @Prop({ required: true })
  summoner2Casts: number;

  @Prop({ required: true })
  summoner2Id: number;

  @Prop({ required: true })
  summonerId: string;

  @Prop({ required: true })
  summonerLevel: number;

  @Prop({ required: true })
  summonerName: string;

  @Prop({ required: true })
  teamEarlySurrendered: boolean;

  @Prop({ required: true })
  teamId: number;

  @Prop({ required: true })
  teamPosition: string;

  @Prop({ required: true })
  timeCCingOthers: number;

  @Prop({ required: true })
  timePlayed: number;

  @Prop({ required: true })
  totalDamageDealt: number;

  @Prop({ required: true })
  totalDamageDealtToChampions: number;

  @Prop({ required: true })
  totalDamageShieldedOnTeammates: number;

  @Prop({ required: true })
  totalDamageTaken: number;

  @Prop({ required: true })
  totalHeal: number;

  @Prop({ required: true })
  totalHealsOnTeammates: number;

  @Prop({ required: true })
  totalMinionsKilled: number;

  @Prop({ required: true })
  totalTimeCCDealt: number;

  @Prop({ required: true })
  totalTimeSpentDead: number;

  @Prop({ required: true })
  totalUnitsHealed: number;

  @Prop({ required: true })
  tripleKills: number;

  @Prop({ required: true })
  trueDamageDealt: number;

  @Prop({ required: true })
  trueDamageDealtToChampions: number;

  @Prop({ required: true })
  trueDamageTaken: number;

  @Prop({ required: true })
  turretKills: number;

  @Prop({ required: true })
  turretTakedowns: number;

  @Prop({ required: true })
  turretsLost: number;

  @Prop({ required: true })
  unrealKills: number;

  @Prop({ required: true })
  visionClearedPings: number;

  @Prop({ required: true })
  visionScore: number;

  @Prop({ required: true })
  visionWardsBoughtInGame: number;

  @Prop({ required: true })
  wardsKilled: number;

  @Prop({ required: true })
  wardsPlaced: number;

  @Prop({ required: true })
  win: boolean;
}

const participantSchema = SchemaFactory.createForClass(Participant);

@Schema({ id: false, _id: false })
export class TeamContribution {
  @Prop({ required: true, type: contributionSchema })
  total: Contribution = new Contribution();

  @Prop({ required: true, type: contributionSchema })
  max: Contribution = new Contribution();

  @Prop({ required: true, type: contributionSchema })
  average: Contribution = new Contribution();
}

const teamContributionSchema = SchemaFactory.createForClass(TeamContribution);

@Schema({ id: false, _id: false })
class ObjectiveInfo {
  @Prop({ required: true })
  first: boolean;

  @Prop({ required: true })
  kills: number;
}

const objectiveInfoSchema = SchemaFactory.createForClass(ObjectiveInfo);

@Schema({ id: false, _id: false })
class Objectives {
  @Prop({ required: true, type: objectiveInfoSchema })
  baron: ObjectiveInfo;

  @Prop({ required: true, type: objectiveInfoSchema })
  champion: ObjectiveInfo;

  @Prop({ required: true, type: objectiveInfoSchema })
  dragon: ObjectiveInfo;

  @Prop({ required: true, type: objectiveInfoSchema })
  inhibitor: ObjectiveInfo;

  @Prop({ required: true, type: objectiveInfoSchema })
  riftHerald: ObjectiveInfo;

  @Prop({ required: true, type: objectiveInfoSchema })
  tower: ObjectiveInfo;
}

const objectivesSchema = SchemaFactory.createForClass(Objectives);

@Schema({ id: false, _id: false })
class Team {
  @Prop()
  bans: any[];

  @Prop({ required: true, type: objectivesSchema })
  objectives: Objectives;

  @Prop({ required: true })
  teamId: number;

  @Prop({ required: true })
  win: boolean;

  @Prop({ required: true, type: teamContributionSchema })
  contribution: TeamContribution;
}

const teamSchema = SchemaFactory.createForClass(Team);

@Schema({ id: false, _id: false })
class Info {
  @Prop({ required: true })
  gameCreation: number;

  @Prop({ required: true })
  gameDuration: number;

  @Prop({ required: true })
  gameEndTimestamp: number;

  @Prop({ required: true, unique: true })
  gameId: number;

  @Prop({ required: true })
  gameMode: string;

  @Prop({ required: true })
  gameName: string;

  @Prop({ required: true })
  gameStartTimestamp: number;

  @Prop({ required: true })
  gameType: string;

  @Prop({ required: true })
  gameVersion: string;

  @Prop({ required: true })
  mapId: number;

  @Prop({ required: true, type: [participantSchema] })
  participants: Participant[];

  @Prop({ required: true })
  platformId: string;

  @Prop({ required: true })
  queueId: number;

  @Prop({ required: true, type: [teamSchema] })
  teams: Team[];

  @Prop({ required: true })
  tournamentCode: string;
}

const infoSchema = SchemaFactory.createForClass(Info);

@Schema({ collection: 'match', id: true })
export class Match extends Document {
  @Prop({ required: true, type: metaDataSchema })
  metadata: Metadata;

  @Prop({ required: true, type: infoSchema })
  info: Info;
}

export const matchSchema = SchemaFactory.createForClass(Match);
