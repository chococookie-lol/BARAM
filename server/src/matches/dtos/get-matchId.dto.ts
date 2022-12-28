import { IsNumberString } from 'class-validator';

export class GetMatchIdParam {
  @IsNumberString()
  matchId: number;
}
