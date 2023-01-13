import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, HttpStatusCode } from 'axios';
import { RiotApiException } from './definition/riot.api.exception';
import { RiotChallengeResponse, RoitSummonerResponse } from './interface';
import { RiotMatchResponse } from './interface/riot.match.interface';

@Injectable()
export class RiotApiService {
  apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('API_KEY');
  }

  async call<T>(uri: string) {
    try {
      return await this.httpService.axiosRef.get<T>(uri, {
        headers: {
          'X-Riot-Token': this.apiKey,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const serviceUnavailableCodes = [
          HttpStatus.BAD_REQUEST,
          HttpStatus.UNAUTHORIZED,
          HttpStatus.FORBIDDEN,
          HttpStatus.METHOD_NOT_ALLOWED,
          HttpStatus.UNSUPPORTED_MEDIA_TYPE,
          HttpStatus.TOO_MANY_REQUESTS,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpStatus.SERVICE_UNAVAILABLE,
          HttpStatus.GATEWAY_TIMEOUT,
        ];

        if (serviceUnavailableCodes.includes(+error.code)) {
          throw new RiotApiException(+error.code, error.message);
        }

        return null;
      }
    }
  }

  async getSummonerByName(name: string) {
    return (
      await this.call<RoitSummonerResponse>(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
      )
    )?.data;
  }

  async getSummonerByPuuid(name: string) {
    return (
      await this.call<RoitSummonerResponse>(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${name}`,
      )
    )?.data;
  }
  async getChallenges(puuid: string) {
    return (
      await this.call<RiotChallengeResponse>(
        `https://kr.api.riotgames.com/lol/challenges/v1/player-data/${puuid}`,
      )
    )?.data;
  }

  async getMatch(matchId: string) {
    return (
      await this.call<RiotMatchResponse>(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      )
    )?.data;
  }
}
