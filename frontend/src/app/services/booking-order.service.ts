import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const bookingServiceHost = environment.BOOKING_HOST || "localhost";
const bookingServicePort = environment.BOOKING_PORT || 3050;
@Injectable({
  providedIn: 'root'
})
export class BookingOrderService {

  private bookingOrderUrl=`http://${bookingServiceHost}:${bookingServicePort}/booking-order/add`

  constructor(private http: HttpClient) { }

  addBookingOrder(details: any): Observable<any> {
    console.log(details)
    return this.http.post<any>(this.bookingOrderUrl, details)
  }
}
