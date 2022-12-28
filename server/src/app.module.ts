import { Module } from '@nestjs/common';
import { SummonersModule } from './summoners/summoners.module';

@Module({
  imports: [SummonersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
