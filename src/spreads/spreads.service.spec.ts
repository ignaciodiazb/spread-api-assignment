/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { SpreadsService } from './spreads.service';

describe('SpreadsService', () => {
  let service: SpreadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SpreadsService],
    }).compile();

    service = module.get<SpreadsService>(SpreadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
