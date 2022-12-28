import { Controller, Get, Param } from '@nestjs/common';
import { SummonersService } from './summoners.service';

@Controller('summoners')
export class SummonersController {
  constructor(private readonly summonersService: SummonersService) {}

  @Get(':userName')
  async findOne(@Param('userName') userName: string) {
    return await this.summonersService.findOne(userName);
  }
}
