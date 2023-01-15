import { IsNumber, IsOptional } from 'class-validator';

export class PostPuuidQuery {
  @IsNumber()
  @IsOptional()
  after?: number;
}
