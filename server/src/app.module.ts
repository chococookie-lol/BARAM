import { Module } from '@nestjs/common';
import { SummonersModule } from './summoners/summoners.module';
import { MatchesService } from './matches/matches.service';
import { MatchesController } from './matches/matches.controller';

@Module({
  imports: [SummonersModule],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class AppModule {}
