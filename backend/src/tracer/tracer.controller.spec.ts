import { Test, TestingModule } from '@nestjs/testing';
import { TracerController } from './tracer.controller';

describe('TracerController', () => {
  let controller: TracerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracerController],
    }).compile();

    controller = module.get<TracerController>(TracerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
