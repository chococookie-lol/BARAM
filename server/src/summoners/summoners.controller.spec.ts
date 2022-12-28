import { Test, TestingModule } from '@nestjs/testing';
import { SummonersController } from './summoners.controller';

describe('SummonersController', () => {
  let controller: SummonersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummonersController],
    }).compile();

    controller = module.get<SummonersController>(SummonersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne is defined', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('findOne returns json', async () => {
    const userName = 'test';
    expect(await controller.findOne(userName)).toBe(userName);
  });
});
