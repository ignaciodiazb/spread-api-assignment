/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { ApiProperty } from '@nestjs/swagger';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { SpreadBaseDto } from './spread-base.dto';

export class SpreadGetAllDto {
  @ApiProperty({
    example: [
      {
        id: '1703020525238',
        market_id: 'BTC-CLP',
        max_bid: ['36351380.0', 'CLP'],
        min_ask: ['36699617.0', 'CLP'],
        spread: 348237,
      },
      {
        id: '1703020525456',
        market_id: 'BTC-COP',
        max_bid: ['164000000.02', 'COP'],
        min_ask: ['166099879.75', 'COP'],
        spread: 2099879.73,
      },
    ],
  })
  spreads: SpreadBaseDto[];
}
