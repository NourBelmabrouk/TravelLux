import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { BookingModule } from './booking-module/booking.module';
import { LogsModule } from './logs/logs.module';
import { LokiLoggerModule } from 'nestjs-loki-logger';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logs/logging.interceptor';
import { TracerModule } from './tracer/tracer.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { TracerService } from './tracer/tracer.service';
import { BookingOrderService } from './booking-module/booking-order.service';


require("dotenv").config()
@Module({
  imports: [
    // PrometheusModule.register({
    //   path: '/metrics'
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities:true,
      synchronize: true,
    }),
    LokiLoggerModule.forRoot({
      lokiUrl: 'http://loki:3100',   // loki server
      labels: {
        'label': 'travlux-booking-service',     // app level labels, these labels will be attached to every log in the application
      },
      logToConsole: true,
      gzip: false // contentEncoding support gzip or not
    }),
    MulterModule.register({
      dest: './files',
    }),
    BookingModule,
    LogsModule,
    TracerModule,
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, useClass: LoggingInterceptor,
    },
    BookingModule,
    TracerService
  ],
})
export class AppModule {}