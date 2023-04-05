import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayModule } from '../play/play.module';
import { RiotApiModule } from '../riot.api/riot.api.module';
import { Summoner, SummonerSchema } from '../summoners/schemas/summoner.schema';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Match, matchSchema } from './schemas/match.schema';
import { SummonersModule } from 'src/summoners/summoners.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Match.name, schema: matchSchema }]),
    MongooseModule.forFeature([{ name: Summoner.name, schema: SummonerSchema }]),
    RiotApiModule,
    PlayModule,
    SummonersModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
