import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RiotApiService } from '..//riot.api/riot.api.service';
import { Summoner, SummonerDocument } from './schemas/summoner.schema';

@Injectable()
export class SummonersService {
  constructor(
    @InjectModel(Summoner.name) private summonerModel: Model<SummonerDocument>,
    private readonly riotApiService: RiotApiService,
  ) {}

  async findOne(summonerName: string) {
    const summoner = await this.summonerModel.findOne({ name: summonerName }).lean();

    if (!summoner) throw new NotFoundException('해당 소환사가 없습니다.');

    return summoner;
  }

  async update(summonerName: string) {
    const summonerFromRiot = await this.riotApiService.getSummoner(summonerName);
    const challenges = await this.riotApiService.getChallenges(summonerFromRiot.puuid);
    const userChallenges = challenges.preferences.challengeIds.map((challengeId) =>
      challenges.challenges.find((c) => c.challengeId === challengeId),
    );

    await this.summonerModel.updateOne(
      { puuid: summonerFromRiot.puuid },
      {
        name: summonerFromRiot.name,
        level: summonerFromRiot.summonerLevel,
        profileIconId: summonerFromRiot.profileIconId,
        puuid: summonerFromRiot.puuid,
        challenges: [...userChallenges],
      },
      { upsert: true },
    );
  }

  async findAllMatches(summonerName: string) {
    return {
      summonerName,
      matchIds: ['84723482140'],
    };
  }

  async updateMatches(summonerName: string, after?: number) {
    return {
      summonerName,
      after,
    };
  }
}
