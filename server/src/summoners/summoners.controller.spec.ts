import { Test, TestingModule } from '@nestjs/testing';
import { SummonersController } from './summoners.controller';
import { SummonersService } from './summoners.service';

describe('SummonersController', () => {
  let controller: SummonersController;
  let service: SummonersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummonersController],
      providers: [SummonersService],
    }).compile();

    controller = module.get<SummonersController>(SummonersController);
    service = module.get<SummonersService>(SummonersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne is defined', () => {
    expect(controller.findOne).toBeDefined();
  });
});
