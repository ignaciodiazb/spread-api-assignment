/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { HttpModule } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { CreateSpreadAlertDto } from './dto/create-spread-alert.dto';
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

  const mockSpread: CreateSpreadAlertDto = {
    id: '1703012653755',
    market_id: 'btc-clp',
    max_bid: ['36352219.0', 'CLP'],
    min_ask: ['36776580.99', 'CLP'],
    spread: 424361.99,
  };

  it('(spreadService) - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('(create spread alert) - should return success message when creating a new spread alert', async () => {
    const response = service.createAlert(mockSpread);

    await expect(response).resolves.toEqual({
      message: 'Spread alert created successfuly',
    });
  });

  it('(get all spreads) - should return a list with all spreads', async () => {
    const response = service.findAll();

    await expect(response).resolves.toEqual(
      expect.objectContaining({
        spreads: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            market_id: expect.any(String),
            max_bid: expect.any(Array),
            min_ask: expect.any(Array),
            spread: expect.any(Number),
          }),
        ]),
      }),
    );
  }, 10000);

  it('(get single spread) - should return spread from specified market id', async () => {
    const response = service.findOne('btc-clp');

    await expect(response).resolves.toEqual(
      expect.objectContaining({
        id: expect.any(String),
        market_id: expect.any(String),
        max_bid: expect.any(Array),
        min_ask: expect.any(Array),
        spread: expect.any(Number),
      }),
    );
  });

  it('(get single spread) - should return not found when market id does not exist', async () => {
    const response = service.findOne('btc-clk');

    await expect(response).rejects.toBeInstanceOf(HttpException);
  });

  it('(get spread alert status) - should return status from specified spread alert', async () => {
    const response = service.getStatus('1703012178474');

    await expect(response).resolves.toEqual(
      expect.objectContaining({
        base_max_bid: expect.any(Array),
        base_min_bid: expect.any(Array),
        current_max_bid: expect.any(Array),
        current_min_ask: expect.any(Array),
        market_id: expect.any(String),
        spread_id: expect.any(String),
        status: expect.any(Number),
      }),
    );
  });

  it('(get spread alert status) - should return not found when spread id does not exist', async () => {
    const response = service.getStatus('1508012978423');

    await expect(response).rejects.toBeInstanceOf(HttpException);
  });
});
