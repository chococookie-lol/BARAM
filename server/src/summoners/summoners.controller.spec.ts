import { Test, TestingModule } from '@nestjs/testing';
import { SummonersController } from './summoners.controller';
import { SummonersService } from './summoners.service';

describe('SummonersController', () => {
  let controller: SummonersController;
  let service: SummonersService;

  const mockSummoner = {
    _id: '63c606679355463463e669d5',
    puuid: 'xF6UfEzvrs89bWB3PhtBLKt74bthXbc2QQGY-8YlgcSvmvVw0SOjvM5zMXT6YpSMhsST65BMj0jFlw',
    __v: 0,
    challenges: [
      {
        challengeId: 2022001,
        percentile: 0.006,
        level: 'MASTER',
        value: 28,
        achievedTime: 1660908685089,
        _id: '63c78c013b96d87cb690268b',
      },
      {
        challengeId: 101101,
        percentile: 0,
        level: 'GRANDMASTER',
        value: 128,
        achievedTime: 1656421103633,
        _id: '63c78c013b96d87cb690268c',
      },
      {
        challengeId: 101106,
        percentile: 0.007,
        level: 'MASTER',
        value: 8,
        achievedTime: 1666795991304,
        _id: '63c78c013b96d87cb690268d',
      },
    ],
    isFetching: false,
    level: 123,
    name: 'dolphinlmg',
    profileIconId: 5528,
    updatedAt: '2023-01-25T07:51:18.986Z',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummonersController],
      providers: [
        {
          provide: SummonersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockSummoner),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SummonersController>(SummonersController);
    service = module.get<SummonersService>(SummonersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne()', () => {
    it('is defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should return one summoner', () => {
      expect(controller.findOne('dolphinlmg')).resolves.toEqual(mockSummoner);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('is defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should update a summoner', async () => {
      const updateSpy = jest.spyOn(service, 'update');

      await controller.update('dolphinlmg');
      expect(updateSpy).toHaveBeenCalledWith('dolphinlmg');
    });
  });
});
