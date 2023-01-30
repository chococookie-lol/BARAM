import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RiotApiService } from '../../riot.api/riot.api.service';
import { Summoner } from '../schemas/summoner.schema';
import { SummonersService } from '../summoners.service';
import { mockSummoner, riotApiService } from './summoners.mock';

describe('SummonersService', () => {
  let service: SummonersService;
  let model: Model<Summoner>;
  let riotService: RiotApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummonersService,
        {
          provide: getModelToken('Summoner'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockSummoner),
            constructor: jest.fn().mockResolvedValue(mockSummoner),
            findOne: jest.fn(),
            updateOne: jest.fn(),
          },
        },
      ],
    })
      .useMocker((token) => {
        if (token === RiotApiService) {
          return riotApiService;
        }
      })
      .compile();

    service = module.get<SummonersService>(SummonersService);
    model = module.get<Model<Summoner>>(getModelToken('Summoner'));
    riotService = module.get<RiotApiService>(RiotApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    it('should return one summoner', () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        lean: jest.fn().mockReturnValueOnce(mockSummoner),
      } as any);

      expect(service.findOne('dolphinlmg')).resolves.toEqual(mockSummoner);
    });

    it('should throw NotFoundException when summoner not exists', () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        lean: jest.fn().mockReturnValueOnce(undefined),
      } as any);

      expect(service.findOne('dolphinlmg')).rejects.toThrowError(
        new NotFoundException('해당 소환사가 없습니다.'),
      );
    });
  });

  describe('update()', () => {
    it('should call summonerModel.updateOne', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        lean: jest.fn().mockReturnValue(mockSummoner),
      } as any);

      const updateSpy = jest.spyOn(model, 'updateOne');

      await service.update('dolphinlmg');
      expect(updateSpy).toHaveBeenCalled();
    });

    it('should throw NotFoundException when summoner exists in DB but not exists in Riot', () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        lean: jest.fn().mockReturnValue(mockSummoner),
      } as any);

      jest.spyOn(riotService, 'getSummonerByPuuid').mockReturnValue(undefined);

      expect(service.update('dolphinlmg')).rejects.toThrowError(
        new NotFoundException('소환사를 찾을 수 없습니다.'),
      );
    });

    it('should throw NotFoundException when summoner not exists in DB and Riot', () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        lean: jest.fn().mockReturnValue(undefined),
      } as any);

      jest.spyOn(riotService, 'getSummonerByName').mockReturnValue(undefined);

      expect(service.update('dolphinlmg')).rejects.toThrowError(
        new NotFoundException('소환사를 찾을 수 없습니다.'),
      );
    });
  });
});
