import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RiotApiService } from '../../riot.api/riot.api.service';
import { PlayService } from '../../play/play.service';
import { Summoner } from '../../summoners/schemas/summoner.schema';
import { MatchesService } from '../matches.service';
import { Match } from '../schemas/match.schema';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import {
  mockLocalMatchData,
  mockMatchIds,
  mockRiotMatchData,
  mockRiotMatchIds,
} from './matches.mock';
import { RiotApiException } from '../../riot.api/definition/riot.api.exception';

describe('MatchesService', () => {
  const puuid = 'wQ9X1e4FSY47C_MoncM1F6gsc7SkU2fGuw0WpP4dLnj7sbeakbg_x2lUDRbP5bGQEEB_1b7z67_B-Q';
  let matchesService: MatchesService;
  let riotApiService: RiotApiService;
  let playService: PlayService;
  let summonerModel: Model<Summoner>;
  let matchModel: Model<Match>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MatchesService,
        {
          provide: getModelToken(Match.name),
          useValue: {
            findOne: jest.fn(),
            updateOne: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
        {
          provide: getModelToken(Summoner.name),
          useValue: {
            updateOne: jest.fn(),
          },
        },
        {
          provide: RiotApiService,
          useValue: {
            getMatchesByPuuid: jest.fn(),
            getMatch: jest.fn(),
          },
        },
        {
          provide: PlayService,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
          },
        },
      ],
    }).compile();

    matchesService = module.get(MatchesService);
    riotApiService = module.get(RiotApiService);
    playService = module.get(PlayService);
    summonerModel = module.get(getModelToken(Summoner.name));
    matchModel = module.get(getModelToken(Match.name));
  });

  it('should be defined', () => expect(matchesService).toBeDefined());

  describe('findOne', () => {
    it('should be defined', () => expect(matchesService.findOne).toBeDefined());

    it('should throw error if matchId is not valid', () => {
      const spy = jest
        .spyOn(matchModel, 'findOne')
        .mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(undefined) } as any));
      expect(matchesService.findOne(6300656741)).rejects.toThrowError(
        new NotFoundException('해당 경기가 없습니다.'),
      );
      expect(spy).toHaveBeenCalledWith({ 'info.gameId': 6300656741 });
    });

    it('should return one match', () => {
      const spy = jest
        .spyOn(matchModel, 'findOne')
        .mockImplementationOnce(
          () => ({ lean: jest.fn().mockReturnValue(mockLocalMatchData) } as any),
        );
      expect(matchesService.findOne(6300656741)).resolves.toBe(mockLocalMatchData);
      expect(spy).toHaveBeenCalledWith({ 'info.gameId': 6300656741 });
    });
  });

  describe('findAll', () => {
    it('should be defined', () => expect(matchesService.findAll).toBeDefined());

    it('should return all matchIds', () => {
      const spy = jest.spyOn(playService, 'findMany').mockResolvedValueOnce(mockMatchIds);
      const after = 0;
      expect(matchesService.findAll(puuid, after)).resolves.toStrictEqual({
        puuid: puuid,
        matchIds: mockMatchIds,
      });
      expect(spy).toHaveBeenCalledWith(puuid, after);
    });
  });

  describe('updateMany', () => {
    it('should be defined', () => expect(matchesService.updateMany).toBeDefined());

    it('should fetch matches', () => {
      const after = 0;
      const summonerSpy = jest
        .spyOn(summonerModel, 'updateOne')
        .mockReturnValueOnce({ lean: jest.fn().mockReturnValueOnce({ matchedCount: 1 }) } as any);
      const matchCountSpy = jest
        .spyOn(matchModel, 'countDocuments')
        .mockReturnValueOnce({ lean: jest.fn().mockReturnValue(0) } as any);
      const riotMatchIdsSpy = jest
        .spyOn(riotApiService, 'getMatchesByPuuid')
        .mockResolvedValueOnce(mockRiotMatchIds);
      const riotMatchSpy = jest
        .spyOn(riotApiService, 'getMatch')
        .mockResolvedValueOnce(mockRiotMatchData);
      const matchUpdateSpy = jest.spyOn(matchModel, 'updateOne');
      const playCreateSpy = jest.spyOn(playService, 'create');

      // on update finish
      summonerSpy.mockReturnValueOnce({
        lean: () => {
          // validate puuid
          expect(summonerSpy).toHaveBeenNthCalledWith(
            1,
            { puuid: puuid, isFetching: false },
            { $set: { isFetching: true } },
          );
          // fetch matchIds
          expect(riotMatchIdsSpy).toHaveBeenCalledWith(puuid, after, 5);
          // check if matchId exists in local db
          expect(matchCountSpy).toHaveBeenCalledWith(
            { 'info.gameId': mockMatchIds[0] },
            { limit: 1 },
          );
          // fetch matchData
          expect(riotMatchSpy).toHaveBeenCalledWith(mockRiotMatchIds[0]);
          // save matchData
          expect(matchUpdateSpy).toHaveBeenCalled();
          // create play for all participants
          expect(playCreateSpy).toHaveBeenCalledTimes(10);
          // update summoner
          expect(summonerSpy).toHaveBeenNthCalledWith(
            2,
            { puuid: puuid, isFetching: true },
            { $set: { isFetching: false } },
          );
        },
      } as any);

      // call returns nothing
      expect(matchesService.updateMany(puuid, after)).resolves.toBeUndefined();
    });

    it('should not fetch existing matches', () => {
      const after = 0;
      const summonerSpy = jest
        .spyOn(summonerModel, 'updateOne')
        .mockReturnValueOnce({ lean: jest.fn().mockReturnValueOnce({ matchedCount: 1 }) } as any);
      const matchCountSpy = jest
        .spyOn(matchModel, 'countDocuments')
        .mockReturnValueOnce({ lean: jest.fn().mockReturnValue(1) } as any);
      const riotMatchIdsSpy = jest
        .spyOn(riotApiService, 'getMatchesByPuuid')
        .mockResolvedValueOnce(mockRiotMatchIds);
      const riotMatchSpy = jest
        .spyOn(riotApiService, 'getMatch')
        .mockResolvedValueOnce(mockRiotMatchData);
      const matchUpdateSpy = jest.spyOn(matchModel, 'updateOne');
      const playCreateSpy = jest.spyOn(playService, 'create');

      // on update finish
      summonerSpy.mockReturnValueOnce({
        lean: () => {
          // validate puuid
          expect(summonerSpy).toHaveBeenNthCalledWith(
            1,
            { puuid: puuid, isFetching: false },
            { $set: { isFetching: true } },
          );
          // fetch matchIds
          expect(riotMatchIdsSpy).toHaveBeenCalledWith(puuid, after, 5);
          // check if matchId exists in local db : exists
          expect(matchCountSpy).toHaveBeenCalledWith(
            { 'info.gameId': mockMatchIds[0] },
            { limit: 1 },
          );
          // fetch matchData
          expect(riotMatchSpy).not.toHaveBeenCalled();
          // save matchData
          expect(matchUpdateSpy).not.toHaveBeenCalled();
          // create play for all participants
          expect(playCreateSpy).not.toHaveBeenCalled();
          // update summoner
          expect(summonerSpy).toHaveBeenNthCalledWith(
            2,
            { puuid: puuid, isFetching: true },
            { $set: { isFetching: false } },
          );
        },
      } as any);

      // call returns nothing
      expect(matchesService.updateMany(puuid, after)).resolves.toBeUndefined();
    });

    it('should throw if puuid is not valid', () => {
      const after = 0;
      jest
        .spyOn(summonerModel, 'updateOne')
        .mockReturnValueOnce({ lean: jest.fn().mockReturnValueOnce({ matchedCount: 0 }) } as any);

      // call returns nothing
      expect(matchesService.updateMany(puuid, after)).rejects.toThrow(
        new ForbiddenException('해당 소환사에 대한 작업을 완료할 수 없습니다.'),
      );
    });

    it('should throw if matchId not found', () => {
      const after = 0;
      jest
        .spyOn(summonerModel, 'updateOne')
        .mockReturnValueOnce({ lean: jest.fn().mockReturnValueOnce({ matchedCount: 1 }) } as any);
      jest.spyOn(riotApiService, 'getMatchesByPuuid').mockResolvedValueOnce(undefined);

      // call returns nothing
      expect(matchesService.updateMany(puuid, after)).rejects.toThrow(
        new RiotApiException(404, '경기를 찾을 수 없습니다.'),
      );
    });

    it('should not update match if fetch failed', () => {
      const after = 0;
      const summonerSpy = jest
        .spyOn(summonerModel, 'updateOne')
        .mockReturnValueOnce({ lean: jest.fn().mockReturnValueOnce({ matchedCount: 1 }) } as any);
      jest
        .spyOn(matchModel, 'countDocuments')
        .mockReturnValueOnce({ lean: jest.fn().mockReturnValue(0) } as any);
      jest.spyOn(riotApiService, 'getMatchesByPuuid').mockResolvedValueOnce(mockRiotMatchIds);
      jest.spyOn(riotApiService, 'getMatch').mockResolvedValueOnce(undefined);
      const matchUpdateSpy = jest.spyOn(matchModel, 'updateOne');
      const playCreateSpy = jest.spyOn(playService, 'create');

      // on update finish
      summonerSpy.mockReturnValueOnce({
        lean: () => {
          // save matchData
          expect(matchUpdateSpy).not.toHaveBeenCalled();
          // create play for all participants
          expect(playCreateSpy).not.toHaveBeenCalled();
          // update summoner
          expect(summonerSpy).toHaveBeenNthCalledWith(
            2,
            { puuid: puuid, isFetching: true },
            { $set: { isFetching: false } },
          );
        },
      } as any);

      // call returns nothing
      expect(matchesService.updateMany(puuid, after)).resolves.toBeUndefined();
    });
  });
});
