import { LoggerMiddleware } from '../../logs/LoggerMiddleware';
import { Injectable} from '@nestjs/common';
import { BookingOrderController } from '../booking-order.controller';

@Injectable()
export class BookingLoggerMiddleware extends LoggerMiddleware{
  constructor(
  ) {
    super(BookingOrderController.name);
  }
}