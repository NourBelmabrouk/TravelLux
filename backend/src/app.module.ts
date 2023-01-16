import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { MulterModule } from '@nestjs/platform-express';
import { TicketsModule } from './tickets/tickets.module';
import { CarsModule } from './car-rent/car-rent.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LokiLoggerModule } from 'nestjs-loki-logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logs/logging.interceptor';


require("dotenv").config()
@Module({
  imports: [
    MailModule,
    // PrometheusModule.register({
    //   path: '/metrics'
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities:true,
      synchronize: true,
    }),
    LokiLoggerModule.forRoot({
      lokiUrl: 'http://localhost:3100',   // loki server
      labels: {
        'label': 'travlux-api',     // app level labels, these labels will be attached to every log in the application
      },
      logToConsole: true,
      gzip: false // contentEncoding support gzip or not
    }),
    MulterModule.register({
      dest: './files',
    }),
    UsersModule,
    AuthModule,
    MailModule,
    TicketsModule,
    CarsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR, useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
