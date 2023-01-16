import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
@Global()
@Module({
  imports: [],
  controllers: [LogsController,
  ],
  providers: [LogsService, 
  {
      provide: APP_INTERCEPTOR, useClass: LoggingInterceptor,
  },],
  exports: []
  
})
export class LogsModule {}