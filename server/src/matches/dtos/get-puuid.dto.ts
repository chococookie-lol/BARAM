import { IsString } from 'class-validator';

export class GetPuuidParam {
  @IsString()
  puuid: string;
}
