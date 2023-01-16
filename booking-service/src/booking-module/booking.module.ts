/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringModule } from 'src/monitoring/monitoring.module';
import { TracerModule } from 'src/tracer/tracer.module';
import { TracerService } from 'src/tracer/tracer.service';
import { BookingOrderController } from './booking-order.controller';
import { BookingOrderEntity } from './booking-order.entity';
import { BookingOrderService } from './booking-order.service';
import { BookingLoggerMiddleware } from './utils/BookingLoggerMiddleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingOrderEntity]), 
    MonitoringModule,
    TracerModule,
  ],
  controllers: [BookingOrderController],
  providers: [BookingOrderService, TracerService]
})

export class BookingModule implements NestModule  {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(BookingLoggerMiddleware).forRoutes('booking-order/*');
  }
}