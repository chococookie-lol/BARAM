import { Controller, Get, Param } from '@nestjs/common';
import { GetMatchIdParam } from './dtos/get-matchId.dto';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('/:matchId')
  async findOne(@Param() param: GetMatchIdParam) {
    return await this.matchesService.findOne(param.matchId);
  }
}
