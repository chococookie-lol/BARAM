import { Module } from '@nestjs/common';
import { SummonersModule } from './summoners/summoners.module';
import { MatchesModule } from './matches/matches.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SummonersModule,
    MatchesModule,
  ],
})
export class AppModule {}
