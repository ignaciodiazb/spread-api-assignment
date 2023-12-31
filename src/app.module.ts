/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { Module } from '@nestjs/common';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpreadsModule } from './spreads/spreads.module';

@Module({
  imports: [SpreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
