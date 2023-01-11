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

  call<T>(uri: string) {
    return this.httpService.axiosRef.get<T>(uri, {
      headers: {
        'X-Riot-Token': this.apiKey,
      },
    });
  }

  async getSummonerByName(name: string) {
    const { data } = await this.call<RoitSummonerResponse>(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
    );

    return data;
  }

  async getSummonerByPuuid(name: string) {
    const { data } = await this.call<RoitSummonerResponse>(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${name}`,
    );

    return data;
  }
  async getChallenges(puuid: string) {
    const { data } = await this.call<RiotChallengeResponse>(
      `https://kr.api.riotgames.com/lol/challenges/v1/player-data/${puuid}`,
    );

    return data;
  }
}
