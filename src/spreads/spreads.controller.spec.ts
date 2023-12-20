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
import { SpreadsController } from './spreads.controller';
import { SpreadsService } from './spreads.service';

describe('SpreadsController', () => {
  let controller: SpreadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpreadsController],
      imports: [HttpModule],
      providers: [SpreadsService],
    }).compile();

    controller = module.get<SpreadsController>(SpreadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
