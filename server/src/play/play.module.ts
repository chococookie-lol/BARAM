import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayService } from './play.service';
import { Play, PlaySchema } from './schemas/play.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Play.name, schema: PlaySchema }])],
  providers: [PlayService],
  exports: [PlayService],
})
export class PlayModule {}
