import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RiotApiService } from './riot.api.service';

@Module({
  imports: [HttpModule],
  providers: [RiotApiService],
  exports: [RiotApiService],
})
export class RiotApiModule {}
