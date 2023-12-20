/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { CreateSpreadAlertDto } from './dto/create-spread-alert.dto';
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

  it('(spreadController) should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('*create spread alert) - should be defined', () => {
    expect(controller.createAlert).toBeDefined();
  });

  it('(create spread alert) - should throw validation errors with malformed body', async () => {
    const mockBadRequestBody: CreateSpreadAlertDto = {
      id: 'abc',
      market_id: null,
      max_bid: ['36352219.0', 'CLP'],
      min_ask: ['36776580.99', 'CLP'],
      spread: 424361.99,
    };

    const transformMock = plainToInstance(
      CreateSpreadAlertDto,
      mockBadRequestBody,
    );

    const validation = await validate(transformMock);

    expect(validation.length).not.toBe(0);
  });

  it('(get all spreads) - should be defined', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('(get single spread) - should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('(get spread alert status) - should be defined', () => {
    expect(controller).toBeDefined();
  });
});
