import { Module } from '@nestjs/common';
import { SummonersController } from './summoners.controller';
import { SummonersService } from './summoners.service';

@Module({
  controllers: [SummonersController],
  providers: [SummonersService],
})
export class SummonersModule {}
