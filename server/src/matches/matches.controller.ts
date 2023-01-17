import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetMatchIdParam } from './dtos/get-matchId.dto';
import { GetPuuidParam } from './dtos/get-puuid.dto';
import { AfterQuery } from './dtos/post-puuid.dto';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('/by-puuid/:puuid')
  async findAll(@Param() param: GetPuuidParam, @Query() query: AfterQuery) {
    return await this.matchesService.findAll(param.puuid, query.after);
  }

  @Post('/by-puuid/:puuid')
  async updateMany(@Param() param: GetPuuidParam, @Query() query: AfterQuery) {
    return await this.matchesService.updateMany(param.puuid, query.after);
  }

  @Get('/:matchId')
  async findOne(@Param() param: GetMatchIdParam) {
    return await this.matchesService.findOne(param.matchId);
  }
}
