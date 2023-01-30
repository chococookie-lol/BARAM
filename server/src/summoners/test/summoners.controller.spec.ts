import { Test, TestingModule } from '@nestjs/testing';
import { SummonersController } from '../summoners.controller';
import { SummonersService } from '../summoners.service';
import { mockSummoner } from './summoners.mock';

describe('SummonersController', () => {
  let controller: SummonersController;
  let service: SummonersService;

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
