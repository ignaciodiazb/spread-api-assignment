/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { AxiosError } from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { CreateSpreadAlertDto } from './dto/create-spread-alert.dto';
import { Spread } from './interfaces/spread.interface';

@Injectable()
export class SpreadsService {
  constructor(private readonly httpService: HttpService) {}

  // Dummy data simulating spreads stored by the user
  private readonly storedSpreads: Spread[] = [
    {
      id: '1703012178474',
      market_id: 'eth-clp',
      max_bid: ['1850552.32', 'CLP'],
      min_ask: ['1871893.6', 'CLP'],
      spread: 21341.28,
    },
    {
      id: '1703012194692',
      market_id: 'btc-clp',
      max_bid: ['36431928.0', 'CLP'],
      min_ask: ['36432761.47', 'CLP'],
      spread: 833.47,
    },
  ];

  async createAlert(body: CreateSpreadAlertDto) {
    // Simulate DB insert
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.storedSpreads.push(body)), 1000);
    });

    return {
      message: 'Spread alert created successfuly',
    };
  }

  async findAll() {
    const {
      data: { markets },
    } = await firstValueFrom(
      this.httpService.get('https://www.buda.com/api/v2/markets').pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            {
              message: error?.response?.statusText,
              statusCode: error.response?.status,
            },
            error.response?.status,
          );
        }),
      ),
    );

    const market_ids = markets.map((market) => market.id);

    let market_spreads = [];
    for (const id of market_ids) {
      let spread = await this.findOne(id);
      market_spreads.push(spread);
    }

    return {
      spreads: market_spreads,
    };
  }

  async findOne(market_id: string) {
    const {
      data: { ticker },
    } = await firstValueFrom(
      this.httpService
        .get(`https://www.buda.com/api/v2/markets/${market_id}/ticker`)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new HttpException(
                `No market found with id ${market_id}`,
                HttpStatus.NOT_FOUND,
              );
            }
            throw new HttpException(
              {
                message: error?.response?.statusText,
                statusCode: error.response?.status,
              },
              error.response?.status,
            );
          }),
        ),
    );
    return {
      id: Date.now().toString(),
      market_id,
      max_bid: ticker?.max_bid,
      min_ask: ticker?.min_ask,
      spread: Number((ticker?.min_ask[0] - ticker?.max_bid[0]).toFixed(2)),
    };
  }

  async getStatus(spread_id: string) {
    // Simulate DB search
    const spread = this.storedSpreads.find((spread) => spread.id === spread_id);

    if (!spread) {
      throw new HttpException(
        `No spread found with id ${spread_id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const currentSpread = await this.findOne(spread.market_id);

    return {
      base_max_bid: spread.max_bid,
      base_min_bid: spread.min_ask,
      current_max_bid: currentSpread.max_bid,
      current_min_ask: currentSpread.min_ask,
      market_id: spread.market_id,
      spread_id,
      status: Number((spread.spread - currentSpread.spread).toFixed(2)),
    };
  }
}
