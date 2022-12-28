import { Module } from '@nestjs/common';
import { SummonersModule } from './summoners/summoners.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [SummonersModule, MatchesModule],
})
export class AppModule {}
