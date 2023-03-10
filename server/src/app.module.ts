import { Module } from '@nestjs/common';
import { SummonersModule } from './summoners/summoners.module';
import { MatchesModule } from './matches/matches.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RiotApiModule } from './riot.api/riot.api.module';
import { PlayModule } from './play/play.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SummonersModule,
    MatchesModule,
    DatabaseModule,
    RiotApiModule,
    PlayModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
