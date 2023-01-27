import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostMatchesQuery } from './dtos/post-matches.dto';
import { SummonersService } from './summoners.service';

@Controller('summoners')
export class SummonersController {
  constructor(private readonly summonersService: SummonersService) {}

  @Get('/:summonerName')
  async findOne(@Param('summonerName') summonerName: string) {
    return await this.summonersService.findOne(summonerName);
  }

  @Post('/:summonerName')
  async update(@Param('summonerName') summonerName: string) {
    return await this.summonersService.update(summonerName);
  }
}
