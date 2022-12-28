import { IsNumberString, IsOptional } from 'class-validator';

export class PostMatchesQuery {
  @IsNumberString()
  @IsOptional()
  after?: number;
}
