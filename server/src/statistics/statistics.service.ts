import { Injectable } from '@nestjs/common';
import { Contribution } from 'src/matches/schemas/match.schema';

const scoreMultiplier: Contribution = {
  dealt: 1,
  damaged: 1,
  heal: 1,
  death: -1,
  gold: 0,
  cs: 0,
  kill: 1,
  assist: 1,
};

@Injectable()
export class StatisticsService {
  async getAll() {
    // todo: use db
    return scoreMultiplier;
  }
}
