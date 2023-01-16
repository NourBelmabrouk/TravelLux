/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingOrderEntity } from './booking-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from "prom-client";

@Injectable()
export class BookingOrderService {
    constructor(
        @InjectRepository(BookingOrderEntity)
        private bookingOrderRepository: Repository<BookingOrderEntity>,
        @InjectMetric("http_request_total") public counter: Counter<string>
        ) { }


    async  findAll(): Promise<BookingOrderEntity[]> {
        try{
            const orders =  await this.bookingOrderRepository.find();
            this.counter.labels({route:"booking-order", statusCode: "200"}).inc()
            return orders;
          }catch(e){
            this.counter.labels({route:"booking-order", statusCode: "400"}).inc()
            throw new NotFoundException("orders Not found")
          }
    }

    async addOrder(order: BookingOrderEntity): Promise<BookingOrderEntity> { 
        try{
            const o = await this.bookingOrderRepository.save(order);
            this.counter.labels({route:"booking-order", statusCode: "200"}).inc()
            return o;
          }catch(e){
            this.counter.labels({route:"booking-order", statusCode: "400"}).inc()
            throw new NotFoundException("order Not found")
          }
    }

    async update(order: BookingOrderEntity): Promise<UpdateResult> {
        try{
            const o = await this.bookingOrderRepository.update(order.id, order);
            this.counter.labels({route:"booking-order", statusCode: "200"}).inc()
            return o;
        }catch(e){
            this.counter.labels({route:"booking-order", statusCode: "400"}).inc()
            throw new NotFoundException("order Not found")
        } 
    }

    async delete(id): Promise<DeleteResult> {
        try{
            const o = await this.bookingOrderRepository.delete(id);
            this.counter.labels({route:"booking-order", statusCode: "200"}).inc()
            return o;
        }catch(e){
            this.counter.labels({route:"booking-order", statusCode: "400"}).inc()
            throw new NotFoundException("order Not found")
        } 
    }
}
