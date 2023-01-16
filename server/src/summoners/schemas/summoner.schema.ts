import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type SummonerDocument = HydratedDocument<Summoner>;

@Schema({
  id: true,
  timestamps: { updatedAt: 'updatedAt', createdAt: false },
  collection: 'summoner',
})
export class Summoner extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  profileIconId: number;

  @Prop({ required: true, unique: true })
  puuid: string;

  @Prop({ default: new Date().getTime(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ required: true, default: false })
  isFetching: boolean;

  @Prop({
    type: [
      {
        challengeId: { type: mongoose.Schema.Types.Number },
        percentile: { type: mongoose.Schema.Types.Number },
        level: { type: mongoose.Schema.Types.String },
        value: { type: mongoose.Schema.Types.Number },
        achievedTime: { type: mongoose.Schema.Types.Number },
      },
    ],
  })
  challenges: Challenge[];
}

export interface Challenge {
  challengeId: number;
  percentile: number;
  level: string;
  value: number;
  achievedTime: number;
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner);
