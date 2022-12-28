import { Controller, Get, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}
  @Get('/:matchId')
  async findOne(@Param('matchId') matchId: number) {
    return await this.matchesService.findOne(matchId);
  }
}
