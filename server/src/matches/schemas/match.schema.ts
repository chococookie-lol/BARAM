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
  @Prop({ required: false })
  '12AssistStreakCount': number;

  @Prop({ required: false })
  abilityUses: number;

  @Prop({ required: false })
  acesBefore15Minutes: number;

  @Prop({ required: false })
  alliedJungleMonsterKills: number;

  @Prop({ required: false })
  baronTakedowns: number;

  @Prop({ required: false })
  blastConeOppositeOpponentCount: number;

  @Prop({ required: false })
  bountyGold: number;

  @Prop({ required: false })
  buffsStolen: number;

  @Prop({ required: false })
  completeSupportQuestInTime: number;

  @Prop({ required: false })
  controlWardsPlaced: number;

  @Prop({ required: false })
  damagePerMinute: number;

  @Prop({ required: false })
  damageTakenOnTeamPercentage: number;

  @Prop({ required: false })
  dancedWithRiftHerald: number;

  @Prop({ required: false })
  deathsByEnemyChamps: number;

  @Prop({ required: false })
  dodgeSkillShotsSmallWindow: number;

  @Prop({ required: false })
  doubleAces: number;

  @Prop({ required: false })
  dragonTakedowns: number;

  @Prop({ required: false })
  earlyLaningPhaseGoldExpAdvantage: number;

  @Prop({ required: false })
  effectiveHealAndShielding: number;

  @Prop({ required: false })
  elderDragonKillsWithOpposingSoul: number;

  @Prop({ required: false })
  elderDragonMultikills: number;

  @Prop({ required: false })
  enemyChampionImmobilizations: number;

  @Prop({ required: false })
  enemyJungleMonsterKills: number;

  @Prop({ required: false })
  epicMonsterKillsNearEnemyJungler: number;

  @Prop({ required: false })
  epicMonsterKillsWithin30SecondsOfSpawn: number;

  @Prop({ required: false })
  epicMonsterSteals: number;

  @Prop({ required: false })
  epicMonsterStolenWithoutSmite: number;

  @Prop({ required: false })
  firstTurretKilledTime?: number;

  @Prop({ required: false })
  flawlessAces: number;

  @Prop({ required: false })
  fullTeamTakedown: number;

  @Prop({ required: false })
  gameLength: number;

  @Prop({ required: false })
  getTakedownsInAllLanesEarlyJungleAsLaner: number;

  @Prop({ required: false })
  goldPerMinute: number;

  @Prop({ required: false })
  hadOpenNexus: number;

  @Prop({ required: false })
  highestCrowdControlScore?: number;

  @Prop({ required: false })
  immobilizeAndKillWithAlly: number;

  @Prop({ required: false })
  initialBuffCount: number;

  @Prop({ required: false })
  initialCrabCount: number;

  @Prop({ required: false })
  jungleCsBefore10Minutes: number;

  @Prop({ required: false })
  junglerTakedownsNearDamagedEpicMonster: number;

  @Prop({ required: false })
  kTurretsDestroyedBeforePlatesFall: number;

  @Prop({ required: false })
  kda: number;

  @Prop({ required: false })
  killAfterHiddenWithAlly: number;

  @Prop({ required: false })
  killParticipation: number;

  @Prop({ required: false })
  killedChampTookFullTeamDamageSurvived: number;

  @Prop({ required: false })
  killsNearEnemyTurret: number;

  @Prop({ required: false })
  killsOnOtherLanesEarlyJungleAsLaner: number;

  @Prop({ required: false })
  killsOnRecentlyHealedByAramPack: number;

  @Prop({ required: false })
  killsUnderOwnTurret: number;

  @Prop({ required: false })
  killsWithHelpFromEpicMonster: number;

  @Prop({ required: false })
  knockEnemyIntoTeamAndKill: number;

  @Prop({ required: false })
  landSkillShotsEarlyGame: number;

  @Prop({ required: false })
  laneMinionsFirst10Minutes: number;

  @Prop({ required: false })
  legendaryCount: number;

  @Prop({ required: false })
  lostAnInhibitor: number;

  @Prop({ required: false })
  maxCsAdvantageOnLaneOpponent: number;

  @Prop({ required: false })
  maxKillDeficit: number;

  @Prop({ required: false })
  maxLevelLeadLaneOpponent: number;

  @Prop({ required: false })
  moreEnemyJungleThanOpponent: number;

  @Prop({ required: false })
  multiKillOneSpell: number;

  @Prop({ required: false })
  multiTurretRiftHeraldCount: number;

  @Prop({ required: false })
  multikills: number;

  @Prop({ required: false })
  multikillsAfterAggressiveFlash: number;

  @Prop({ required: false })
  mythicItemUsed?: number;

  @Prop({ required: false })
  outerTurretExecutesBefore10Minutes: number;

  @Prop({ required: false })
  outnumberedKills: number;

  @Prop({ required: false })
  outnumberedNexusKill: number;

  @Prop({ required: false })
  perfectDragonSoulsTaken: number;

  @Prop({ required: false })
  perfectGame: number;

  @Prop({ required: false })
  pickKillWithAlly: number;

  @Prop({ required: false })
  poroExplosions: number;

  @Prop({ required: false })
  quickCleanse: number;

  @Prop({ required: false })
  quickFirstTurret: number;

  @Prop({ required: false })
  quickSoloKills: number;

  @Prop({ required: false })
  riftHeraldTakedowns: number;

  @Prop({ required: false })
  saveAllyFromDeath: number;

  @Prop({ required: false })
  scuttleCrabKills: number;

  @Prop({ required: false })
  shortestTimeToAceFromFirstTakedown?: number;

  @Prop({ required: false })
  skillshotsDodged: number;

  @Prop({ required: false })
  skillshotsHit: number;

  @Prop({ required: false })
  snowballsHit: number;

  @Prop({ required: false })
  soloBaronKills: number;

  @Prop({ required: false })
  soloKills: number;

  @Prop({ required: false })
  stealthWardsPlaced: number;

  @Prop({ required: false })
  survivedSingleDigitHpCount: number;

  @Prop({ required: false })
  survivedThreeImmobilizesInFight: number;

  @Prop({ required: false })
  takedownOnFirstTurret: number;

  @Prop({ required: false })
  takedowns: number;

  @Prop({ required: false })
  takedownsAfterGainingLevelAdvantage: number;

  @Prop({ required: false })
  takedownsBeforeJungleMinionSpawn: number;

  @Prop({ required: false })
  takedownsFirstXMinutes: number;

  @Prop({ required: false })
  takedownsInAlcove: number;

  @Prop({ required: false })
  takedownsInEnemyFountain: number;

  @Prop({ required: false })
  teamBaronKills: number;

  @Prop({ required: false })
  teamDamagePercentage: number;

  @Prop({ required: false })
  teamElderDragonKills: number;

  @Prop({ required: false })
  teamRiftHeraldKills: number;

  @Prop({ required: false })
  threeWardsOneSweeperCount: number;

  @Prop({ required: false })
  tookLargeDamageSurvived: number;

  @Prop({ required: false })
  turretPlatesTaken: number;

  @Prop({ required: false })
  turretTakedowns: number;

  @Prop({ required: false })
  turretsTakenWithRiftHerald: number;

  @Prop({ required: false })
  twentyMinionsIn3SecondsCount: number;

  @Prop({ required: false })
  unseenRecalls: number;

  @Prop({ required: false })
  visionScoreAdvantageLaneOpponent: number;

  @Prop({ required: false })
  visionScorePerMinute: number;

  @Prop({ required: false })
  wardTakedowns: number;

  @Prop({ required: false })
  wardTakedownsBefore20M: number;

  @Prop({ required: false })
  wardsGuarded: number;

  @Prop({ required: false })
  killingSprees?: number;

  @Prop({ required: false })
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
