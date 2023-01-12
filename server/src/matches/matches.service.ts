import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RiotApiService } from 'src/riot.api/riot.api.service';
import { Match, MatchDocument, TeamContribution } from './schemas/match.schema';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name)
    private matchModel: Model<MatchDocument>,
    private readonly riotApiService: RiotApiService,
  ) {}

  async findOne(matchId: number) {
    const match = await this.matchModel.findOne({ id: matchId }).lean();

    if (!match) throw new NotFoundException('해당 경기가 없습니다.');

    return match;
  }

  async updateOne(matchId: number) {
    const match = await this.riotApiService.getMatch(`KR_${matchId}`);
    console.log(match);
    if (!match) throw new NotFoundException('경기를 찾을 수 없습니다.');

    for (const participant of match.info.participants) {
      const contribution = {
        dealt: participant.totalDamageDealtToChampions,
        damaged: participant.totalDamageTaken + participant.damageSelfMitigated,
        heal: participant.totalHeal,
        death: participant.challenges.deathsByEnemyChamps,
        gold: participant.goldEarned,
        cs: participant.totalMinionsKilled,
      };

      participant['contribution'] = contribution;
    }

    const totalContribution = {
      blue: new TeamContribution(),
      red: new TeamContribution(),
    };

    const totalExcepts = ['killParticipation', 'death'];
    const averageExcepts = ['killParticipation'];

    match.info.participants.forEach((participant) => {
      const target = participant.teamId === 100 ? totalContribution.blue : totalContribution.red;

      for (const key of Object.keys(participant['contribution'])) {
        target[`${key}Max`] = Math.max(
          participant['contribution'][key],
          target[`${key}Max`] ? target[`${key}Max`] : 0,
        );
        if (totalExcepts.findIndex((val) => val === key) !== -1) continue;
        if (!target[key]) target[key] = 0;
        target[key] += participant['contribution'][key];
      }
    });

    totalContribution.blue['death'] = match.info.teams.at(1).objectives.champion.kills;
    totalContribution.red['death'] = match.info.teams.at(0).objectives.champion.kills;

    match.info.participants.forEach((participant) => {
      const target = participant.teamId === 100 ? totalContribution.blue : totalContribution.red;
      const participation = {
        kill: Math.round(participant.challenges.killParticipation * 1000) / 1000,
      };

      Object.keys(participant['contribution']).forEach((key) => {
        participation[key] =
          Math.round((participant['contribution'][key] / target[key]) * 1000) / 1000;
      });

      participant['participation'] = participation;
    });

    for (const team of ['blue', 'red']) {
      Object.keys(match.info.participants[0]['contribution']).forEach((key) => {
        if (averageExcepts.findIndex((val) => val === key) !== -1) return;
        totalContribution[team][`${key}Average`] = totalContribution[team][key] / 5;
      });
    }

    match.info.teams[0]['contribution'] = totalContribution.blue;
    match.info.teams[1]['contribution'] = totalContribution.red;

    await this.matchModel.updateOne(
      { id: matchId },
      {
        id: matchId,
        info: match.info,
        metadata: match.metadata,
      },
      { upsert: true },
    );
  }
}
