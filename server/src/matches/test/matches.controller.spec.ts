import { Test } from '@nestjs/testing';
import { MatchesController } from '../matches.controller';
import { mockLocalMatchData } from './matches.mock';
import { MatchesService } from '../matches.service';

describe('MatchesController', () => {
  const puuid = 'wQ9X1e4FSY47C_MoncM1F6gsc7SkU2fGuw0WpP4dLnj7sbeakbg_x2lUDRbP5bGQEEB_1b7z67_B-Q';
  let controller: MatchesController;
  let service: MatchesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MatchesController],
      providers: [
        {
          provide: MatchesService,
          useValue: {
            findAll: jest.fn(),
            updateMany: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(MatchesController);
    service = module.get(MatchesService);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  describe('findOne', () => {
    it('should be defined', () => expect(controller.findOne).toBeDefined());

    it('should return one match', async () => {
      const spy = jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockLocalMatchData);
      await controller.findOne({ matchId: 6300656741 });
      expect(spy).toHaveBeenCalledWith(6300656741);
    });
  });

  describe('updateMany', () => {
    it('should be defined', () => expect(controller.updateMany).toBeDefined());

    it('should updateMany', async () => {
      const spy = jest.spyOn(service, 'updateMany');
      await controller.updateMany({ puuid: puuid }, { after: 0 });
      expect(spy).toHaveBeenCalledWith(puuid, 0);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => expect(controller.findAll).toBeDefined());

    it('should return all matches', async () => {
      const spy = jest.spyOn(service, 'findAll');
      await controller.findAll(
        {
          puuid: puuid,
        },
        { after: 0 },
      ),
        expect(spy).toHaveBeenCalledWith(puuid, 0);
    });
  });
});
