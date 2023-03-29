import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Play, PlayDocument } from './schemas/play.schema';

@Injectable()
export class PlayService {
  constructor(@InjectModel(Play.name) private playModel: Model<PlayDocument>) {}

  async findMany(puuid: string, after?: number) {
    const plays = after
      ? await this.playModel
          .find({ puuid: puuid }, {}, { sort: { gameCreation: -1 } })
          .where('matchId')
          .lt(after)
          .limit(10)
          .lean()
      : await this.playModel
          .find({ puuid: puuid }, {}, { sort: { gameCreation: -1 } })
          .limit(10)
          .lean();

    return plays.map((play) => play.matchId);
  }

  async create(puuid: string, matchId: number, gameCreation: number) {
    await this.playModel.create({
      puuid: puuid,
      matchId: matchId,
      gameCreation: gameCreation,
    });
  }
}
