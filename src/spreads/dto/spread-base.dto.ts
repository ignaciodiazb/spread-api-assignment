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

export class SpreadBaseDto {
  @ApiProperty({ example: '1703014249887', required: true })
  id: string;

  @ApiProperty({ example: 'btc-clp', required: true })
  market_id: string;

  @ApiProperty({ example: ['36350004.01', 'CLP'], required: true })
  max_bid: [string, string];

  @ApiProperty({ example: ['36764286.0', 'CLP'], required: true })
  min_ask: [string, string];

  @ApiProperty({ example: 414281.99, minimum: 0, required: true })
  spread: number;
}
