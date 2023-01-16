import { IsNumberString, IsOptional } from 'class-validator';

export class AfterQuery {
  @IsOptional()
  @IsNumberString()
  after?: number;
}
