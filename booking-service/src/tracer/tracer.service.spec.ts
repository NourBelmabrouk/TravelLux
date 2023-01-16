import { Test, TestingModule } from '@nestjs/testing';
import { TracerService } from './tracer.service';

describe('TracerService', () => {
  let service: TracerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TracerService],
    }).compile();

    service = module.get<TracerService>(TracerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
