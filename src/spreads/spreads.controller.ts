/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { Controller, Get, Param, Version } from '@nestjs/common';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { SpreadsService } from './spreads.service';

@Controller('spreads')
export class SpreadsController {
  constructor(private readonly spreadsService: SpreadsService) {}

  @Get()
  @Version('1')
  findAll(): Promise<object> {
    return this.spreadsService.findAll();
  }

  @Get(':market_id')
  @Version('1')
  findOne(@Param('market_id') market_id: string): Promise<object> {
    return this.spreadsService.findOne(market_id);
  }

  @Get(':spread_id/status')
  @Version('1')
  getStatus(@Param('spread_id') spread_id: string): Promise<object> {
    return this.spreadsService.getStatus(spread_id);
  }
}
