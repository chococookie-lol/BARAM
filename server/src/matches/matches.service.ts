import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RiotApiService } from 'src/riot.api/riot.api.service';
import { Contribution, Match, MatchDocument, TeamContribution } from './schemas/match.schema';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name)
    private matchModel: Model<MatchDocument>,
    private readonly riotApiService: RiotApiService,
  ) {}

  async findOne(matchId: number) {
    const match = await this.matchModel.findOne({ 'info.gameId': matchId }).lean();

    if (!match) throw new NotFoundException('해당 경기가 없습니다.');

    return match;
  }

  async findAll(puuid: string) {
    const matchIds: number[] = await this.matchModel
      .distinct('info.gameId', { 'metadata.participants': { $all: [puuid] } })
      .lean();

    return {
      puuid,
      matchIds: matchIds,
    };
  }

  async updateMany(puuid: string, after: number) {
    const matches = await this.riotApiService.getMatchesByPuuid(puuid, after, 3);

    if (!matches) throw new NotFoundException('경기를 찾을 수 없습니다.');

    for (const matchId of matches) {
      const id: number = +matchId.substring(3);

      const contributionKeys = Object.getOwnPropertyNames(new Contribution());

      // check db
      if (!(await this.matchModel.countDocuments({ 'info.gameId': id }, { limit: 1 }).lean())) {
        // fetch if not found
        const match = <Match>await this.riotApiService.getMatch(matchId);
        if (!match) throw new NotFoundException('경기를 찾을 수 없습니다.');

        // create property
        match.info.teams[0].contribution = new TeamContribution();
        match.info.teams[1].contribution = new TeamContribution();

        // personal & team contribution (value)
        for (const participant of match.info.participants) {
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

          participant.contribution = contribution;

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
          });
        }

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
      }
    }
  }
}
