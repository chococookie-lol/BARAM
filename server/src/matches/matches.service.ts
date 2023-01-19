import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayService } from 'src/play/play.service';
import { RiotApiException } from 'src/riot.api/definition/riot.api.exception';
import { RiotApiService } from 'src/riot.api/riot.api.service';
import { Summoner, SummonerDocument } from 'src/summoners/schemas/summoner.schema';
import { Contribution, Match, MatchDocument, TeamContribution } from './schemas/match.schema';

interface Score {
  index: number;
  score: number;
}

// TODO : 계수 조정
const scoreMultiplier: Contribution = {
  dealt: 1,
  damaged: 1,
  heal: 0.5,
  death: -1,
  gold: 1,
  cs: 0.5,
  kill: 0.8,
};

@Injectable()
export class MatchesService {
  private logger = new Logger(MatchesService.name);

  constructor(
    @InjectModel(Match.name)
    private matchModel: Model<MatchDocument>,
    @InjectModel(Summoner.name) private summonerModel: Model<SummonerDocument>,
    private readonly riotApiService: RiotApiService,
    private readonly playService: PlayService,
  ) {}

  async findOne(matchId: number) {
    const match = await this.matchModel.findOne({ 'info.gameId': matchId }).lean();

    if (!match) throw new NotFoundException('해당 경기가 없습니다.');

    return match;
  }

  async findAll(puuid: string, after?: number) {
    const matchIds = await this.playService.findMany(puuid, after);

    return {
      puuid,
      matchIds: matchIds,
    };
  }

  async updateMany(puuid: string, after: number) {
    const updateSummoner = await this.summonerModel
      .updateOne({ puuid: puuid, isFetching: false }, { $set: { isFetching: true } })
      .lean();

    if (updateSummoner.matchedCount === 0)
      throw new ForbiddenException('해당 소환사에 대한 작업을 완료할 수 없습니다.');

    const matches = await this.riotApiService.getMatchesByPuuid(puuid, after, 5);

    if (!matches) throw new RiotApiException(404, '경기를 찾을 수 없습니다.');

    const promises = matches.map(async (matchId) => {
      const id: number = +matchId.substring(3);

      const contributionKeys = Object.getOwnPropertyNames(new Contribution());

      const scores: Score[] = [];

      // check db
      if (!(await this.matchModel.countDocuments({ 'info.gameId': id }, { limit: 1 }).lean())) {
        // fetch if not found
        const match = <Match>await this.riotApiService.getMatch(matchId);
        if (!match) throw new NotFoundException(`경기(id:${id}) 를 찾을 수 없습니다.`);

        // create property
        match.info.teams[0].contribution = new TeamContribution();
        match.info.teams[1].contribution = new TeamContribution();

        // personal & team contribution (value)
        match.info.participants.forEach((participant, index, arr) => {
          // create property
          const contribution = new Contribution();

          // personal contribution statistics
          contribution.dealt = participant.totalDamageDealtToChampions;
          contribution.damaged = participant.totalDamageTaken + participant.damageSelfMitigated;
          contribution.heal = participant.totalHeal;
          contribution.death = participant.challenges.deathsByEnemyChamps;
          contribution.gold = participant.goldEarned;
          contribution.cs = participant.totalMinionsKilled;
          contribution.kill = participant.kills;

          arr[index].contribution = contribution;

          const score: Score = {
            index: index,
            score: 0,
          };

          // team statistics
          const teamContribution = (
            participant.teamId === 100 ? match.info.teams[0] : match.info.teams[1]
          ).contribution;

          contributionKeys.forEach((key) => {
            // max value
            teamContribution.max[key] = Math.max(
              participant.contribution[key],
              teamContribution.max[key] || 0,
            );

            // total value (for average calculation)
            teamContribution.total[key] += participant.contribution[key];

            // calculate individual scores
            score.score += scoreMultiplier[key] * participant.contribution[key];
          });

          scores.push(score);
        });

        // sort scores
        scores.sort((a: Score, b: Score) => (a.score <= b.score ? 1 : -1));

        // set score ranks
        scores.forEach((score, index) => {
          match.info.participants[score.index].contributionRank = index;
        });

        // personal contribution (percentage)
        for (const participant of match.info.participants) {
          // create property
          const contributionPercentage = new Contribution();

          const teamContribution = (
            participant.teamId === 100 ? match.info.teams[0] : match.info.teams[1]
          ).contribution;

          // personal participation statistics (percentage)
          contributionKeys.forEach((key) => {
            // TODO: consider version & optimize : ex) make use of 'KillParticipation'
            contributionPercentage[key] =
              Math.round((participant.contribution[key] / teamContribution.total[key]) * 1000) /
              1000;
          });

          participant.contributionPercentage = contributionPercentage;
        }

        // team contribution : average
        contributionKeys.forEach((key) => {
          for (const team of match.info.teams) {
            team.contribution.average[key] = team.contribution.total[key] / 5;
          }
        });

        await this.matchModel.updateOne({ 'info.gameId': id }, match, { upsert: true });
        await this.playService.create(puuid, id, match.info.gameCreation);
      }
      return id;
    });

    (async () => {
      const res = await Promise.allSettled(promises);

      res.forEach((r) => {
        if (r.status === 'fulfilled') this.logger.log(r.value);
        else if (r.status === 'rejected') this.logger.error(r.reason);
      });

      await this.summonerModel
        .updateOne({ puuid: puuid, isFetching: true }, { $set: { isFetching: false } })
        .lean();
    })();

    return;
  }
}
