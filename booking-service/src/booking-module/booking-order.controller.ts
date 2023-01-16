/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TracerService } from 'src/tracer/tracer.service';
import { BookingOrderEntity } from './booking-order.entity';
import { BookingOrderService } from './booking-order.service';

@Controller('booking-order')
export class BookingOrderController {
    constructor(
      private bookingOrderService: BookingOrderService,
      private readonly tracerService: TracerService,
      ) {}

    @Get('getAll')
    async getBookingOrders(): Promise<BookingOrderEntity[]> {
      return await this.tracerService.tracingFunction(
        async () => {    
          return await this.bookingOrderService.findAll();
        },
        '/booking-order/getAll',
        'GET'
        )
    } 
     
    @Post('add')
    async addOrder(@Body() details: BookingOrderEntity): Promise<any>{
      return await this.tracerService.tracingFunction(
        async () => {    
          return await this.bookingOrderService.addOrder(details);
        },
        '/booking-order/add',
        'POST'
        )  
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() details: BookingOrderEntity): Promise<any> {
      return await this.tracerService.tracingFunction(
        async () => {    
          details.id = Number(id);
          console.log('Update #' + details.id)
          return this.bookingOrderService.update(details);
        },
        'booking-order/:id/update',
        'PUT'
        )

        
    }  

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return await this.tracerService.tracingFunction(
        async () => {    
          return this.bookingOrderService.delete(id);
        },
        'booking-order/:id/delete',
        'DELETE'
        )
    }  
}
