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



require("dotenv").config()
@Module({
  imports: [
    MailModule,
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
    }),MulterModule.register({
      dest: './files',
    }),
    UsersModule,
    AuthModule,
    MailModule,
    TicketsModule,
    CarsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
