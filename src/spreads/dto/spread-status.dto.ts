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

export class SpreadStatusDto {
  @ApiProperty({ example: ['1850552.32', 'CLP'], required: true })
  base_max_bid: [string, string];

  @ApiProperty({ example: ['1871893.6', 'CLP'], required: true })
  base_min_ask: [string, string];

  @ApiProperty({ example: ['1877761.45', 'CLP'], required: true })
  current_max_bid: [string, string];

  @ApiProperty({ example: ['1892396.11', 'CLP'], required: true })
  current_min_ask: [string, string];

  @ApiProperty({ example: 'eth-clp', required: true })
  market_id: string;

  @ApiProperty({ example: '1703012178474', required: true })
  spread_id: string;

  @ApiProperty({ example: 6706.62, minimum: 0, required: true })
  status: number;
}
