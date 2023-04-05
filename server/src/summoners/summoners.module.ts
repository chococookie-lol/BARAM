import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RiotApiModule } from 'src/riot.api/riot.api.module';
import { Summoner, SummonerSchema } from './schemas/summoner.schema';
import { SummonersController } from './summoners.controller';
import { SummonersService } from './summoners.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summoner.name, schema: SummonerSchema }]),
    RiotApiModule,
  ],
  controllers: [SummonersController],
  providers: [SummonersService],
  exports: [SummonersService],
})
export class SummonersModule {}
