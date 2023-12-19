/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { CreateSpreadAlertDto } from './dto/create-spread-alert.dto';
import { SpreadBaseDto } from './dto/spread-base.dto';
import { SpreadGetAllDto } from './dto/spread-get-all.dto';
import { SpreadStatusDto } from './dto/spread-status.dto';
import { SpreadsService } from './spreads.service';

@ApiTags('Spreads')
@Controller('spreads')
export class SpreadsController {
  constructor(private readonly spreadsService: SpreadsService) {}

  @Post('alert')
  @Version('1')
  @ApiBody({
    description: 'JSON structure for spread object',
    type: CreateSpreadAlertDto,
  })
  @ApiOperation({
    summary: 'Create spread alert.',
  })
  @ApiResponse({
    description: 'Spread alert created',
    status: 201,
  })
  createAlert(@Body() body: CreateSpreadAlertDto): Promise<object> {
    return this.spreadsService.createAlert(body);
  }

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Get spreads from all markets.',
  })
  @ApiResponse({
    description: 'Get all spreads.',
    status: 200,
    type: SpreadGetAllDto,
  })
  findAll(): Promise<object> {
    return this.spreadsService.findAll();
  }

  @Get(':market_id')
  @Version('1')
  @ApiOperation({
    summary: 'Get single spread.',
  })
  @ApiParam({
    description: 'Numeric ID of the market spread to get.',
    example: 'btc-clp',
    name: 'market_id',
    required: true,
  })
  @ApiResponse({
    description: 'Get market spread.',
    status: 200,
    type: SpreadBaseDto,
  })
  findOne(@Param('market_id') market_id: string): Promise<object> {
    return this.spreadsService.findOne(market_id);
  }

  @Get(':spread_id/status')
  @Version('1')
  @ApiOperation({
    summary: 'Get spread status based on alert.',
  })
  @ApiParam({
    description:
      "Numeric ID of the spread to compare against market's current spread.",
    example: '1703012178474',
    name: 'spread_id',
    required: true,
  })
  @ApiResponse({
    description: 'Get spread status.',
    status: 200,
    type: SpreadStatusDto,
  })
  getStatus(@Param('spread_id') spread_id: string): Promise<object> {
    return this.spreadsService.getStatus(spread_id);
  }
}
