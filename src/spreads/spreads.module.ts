/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { SpreadsController } from './spreads.controller';
import { SpreadsService } from './spreads.service';

@Module({
  controllers: [SpreadsController],
  imports: [HttpModule],
  providers: [SpreadsService],
})
export class SpreadsModule {}
