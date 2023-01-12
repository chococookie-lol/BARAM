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
}
