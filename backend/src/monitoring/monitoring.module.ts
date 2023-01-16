import { Global, Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../logs/logging.interceptor';
@Global()
@Module({
  imports: [PrometheusModule.register({
    path: '/metrics'
  })],
  controllers: [MonitoringController,
  ],
  providers: [MonitoringService, 
  {
      provide: APP_INTERCEPTOR, useClass: LoggingInterceptor,
  },
  makeCounterProvider({
      name: "http_request_total",
      help: "http_request_total_help",
      labelNames: ['route', 'statusCode']
    }),
    makeCounterProvider({
      name: "total_enrolment",
      help: "Total enrolment by tournament",
      labelNames: ['tournament', 'status']
    })],
  exports: [
    PrometheusModule,
    makeCounterProvider({
      name: "http_request_total",
      help: "http_request_total_help",
      labelNames: ['route', 'statusCode']
    }), 
    makeCounterProvider({
      name: "total_enrolment",
      help: "Total enrolment by tournament",
      labelNames: ['tournament']
    })
  ]
  
})
export class MonitoringModule {}