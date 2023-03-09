import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PlayDocument = HydratedDocument<Play>;

@Schema({
  id: true,
  collection: 'play',
})
export class Play extends Document {
  @Prop({ required: true })
  puuid: string;

  @Prop({ required: true })
  matchId: number;

  @Prop({ required: true })
  gameCreation: number;
}

export const PlaySchema = SchemaFactory.createForClass(Play).index(
  { gameCreation: -1, matchId: -1, puuid: 1 },
  { unique: true },
);
