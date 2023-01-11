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

  async findOne(userName: string) {
    const summoner = await this.summonerModel.findOne({ name: userName }).lean();

    if (!summoner) throw new NotFoundException('해당 소환사가 없습니다.');

    return summoner;
  }

  async update(userName: string) {
    const summonerFromRiot = await this.riotApiService.getSummoner(userName);
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

  async findAllMatches(userName: string) {
    return {
      userName,
      matchIds: [
        '84723482140',
        '84723482140',
        '84723482140',
        '84723482140',
        '84723482140',
        '84723482140',
        '84723482140',
        '84723482140',
        '84723482140',
        '84723482140',
      ],
    };
  }

  async updateMatches(userName: string, after?: number) {
    return {
      userName,
      after,
    };
  }
}
