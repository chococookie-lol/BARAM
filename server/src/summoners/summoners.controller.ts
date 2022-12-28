import { Controller, Get, Param, Post } from '@nestjs/common';
import { SummonersService } from './summoners.service';

@Controller('summoners')
export class SummonersController {
  constructor(private readonly summonersService: SummonersService) {}

  @Get('/:userName')
  async findOne(@Param('userName') userName: string) {
    return await this.summonersService.findOne(userName);
  }

  @Post('/:userName')
  async update(@Param('userName') userName: string) {
    return await this.summonersService.update(userName);
  }

  @Get('/:userName/matches')
  async findAllMatches(@Param('userName') userName: string) {
    return this.summonersService.findAllMatches(userName);
  }
}
