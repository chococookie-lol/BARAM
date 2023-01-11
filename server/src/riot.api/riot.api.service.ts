import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotChallengeResponse, RoitSummonerResponse } from './interface';

@Injectable()
export class RiotApiService {
  apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('API_KEY');
  }

  async getSummoner(name: string) {
    const { data } = await this.httpService.axiosRef.get<RoitSummonerResponse>(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
      {
        headers: {
          'X-Riot-Token': this.apiKey,
        },
      },
    );

    return data;
  }

  async getChallenges(puuid: string) {
    const { data } = await this.httpService.axiosRef.get<RiotChallengeResponse>(
      `https://kr.api.riotgames.com/lol/challenges/v1/player-data/${puuid}`,
      {
        headers: {
          'X-Riot-Token': this.apiKey,
        },
      },
    );

    return data;
  }
}
