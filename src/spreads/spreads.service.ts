/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { AxiosError } from 'axios';
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */

@Injectable()
export class SpreadsService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(market_id: string) {
    const {
      data: { ticker },
    } = await firstValueFrom(
      this.httpService
        .get(`https://www.buda.com/api/v2/markets/${market_id}/ticker`)
        .pipe(
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
    return {
      market_id,
      max_bid: ticker?.max_bid,
      min_ask: ticker?.min_ask,
      spread: Number((ticker?.min_ask[0] - ticker?.max_bid[0]).toFixed(2)),
    };
  }
}
