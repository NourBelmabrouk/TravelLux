import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { Reservation } from '../models/reservation.model';
import { environment } from './../../environments/environment';

const backendHost = environment.BACKEND_HOST || "localhost";
const backendServicePort = environment.BACKEND_PORT || 3000;

@Injectable({
  providedIn: 'root'
})
export class CarRentalService {
    firstName!:  string;
    lastName!:  string;
    email!:  string;
    tel!: number;
    pick_up_date!:Date;
    pick_up_location!:  string;
    nbrDays!: number;
    payment_method!:  string;
    car_id!:  string;


    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  constructor(private http : HttpClient) { }

  // All cars available
  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`http://${backendHost}:${backendServicePort}/cars`);
  }

  // Cars Fileres
  // 1. Brand:
  getAllBrands(): Observable<string[]> {
    return this.http.get<string[]>(`ttp://${backendHost}:${backendServicePort}/cars/all/brands`);
  }
  getCarsByBrand(brand: string): Observable<Car[]> {
    return this.http.get<Car[]>(`http://${backendHost}:${backendServicePort}/cars/brands/`+brand);
  }

  // 2. Year:
  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(`http://${backendHost}:${backendServicePort}/cars/all/years`);
  }
  getCarsByYear(year: number): Observable<Car[]> {
    return this.http.get<Car[]>(`http://${backendHost}:${backendServicePort}/cars/years/`+year);
  }

  // 3. Car classes:
  getAllCarClasses(): Observable<string[]> {
    return this.http.get<string[]>(`http://${backendHost}:${backendServicePort}/cars/all/car_classes`);
  }
  getCarsByClass(brand: string): Observable<Car[]> {
    return this.http.get<Car[]>(`http://${backendHost}:${backendServicePort}/cars/classes/`+brand);
  }

  // 4. Car types:
  getAllCarTypes(): Observable<string[]> {
    return this.http.get<string[]>(`http://${backendHost}:${backendServicePort}/cars/all/car_types`);
  }
  getCarsByType(car_type: string): Observable<Car[]> {
    return this.http.get<Car[]>(`http://${backendHost}:${backendServicePort}/cars/types/`+car_type);
  }

  // 5. AC:
  getCarsByAC(ac: string): Observable<Car[]> {
    return this.http.get<Car[]>(`http://${backendHost}:${backendServicePort}/cars/airconditioner/`+ac);
  }
  // 6. Fuel policy:
  getAllFuelPolicies(): Observable<string[]> {
    return this.http.get<string[]>(`http://${backendHost}:${backendServicePort}/cars/all/fuel_policies`);
  }
  getCarsByFuelPolicy(fuel_policy: string): Observable<Car[]> {
    return this.http.get<Car[]>(`http://${backendHost}:${backendServicePort}/cars/fuelpolicy/`+fuel_policy);
  }
  // 7. Color:
  getAllColors(): Observable<string[]> {
    return this.http.get<string[]>(`http://${backendHost}:${backendServicePort}/cars/all/colors`);
  }
  getCarsByColor(color: string): Observable<Car[]> {
    return this.http.get<Car[]>(`http://${backendHost}:${backendServicePort}/cars/colors/`+color);
  }

  // Get the reservation params
  setFirstName(firstName: string){
    this.firstName = firstName;
  }
  setLastName(lastName: string){
    this.lastName = lastName;
  }
  setEmail(email: string){
    this.email = email;
  }
  setTel(tel: number){
    this.tel = tel;
  }
  setPick_up_date(pick_up_date: Date){
    this.pick_up_date = pick_up_date;
  }
  setPick_up_location(pick_up_location: string){
    this.pick_up_location = pick_up_location;
  }
  setNbrDays(nbrDays: number){
    this.nbrDays = nbrDays;
  }
  setPayment_method(payment_method: string){
    this.payment_method = payment_method;
  }
  setCar_id(car_id: string){
    this.car_id = car_id;
  }



  createReservation(): Observable<Reservation>{
    const reservation = new Reservation(
      this.firstName,
      this.lastName,
      this.email,
      this.tel,
      this.pick_up_date,
      this.pick_up_location,
      this.nbrDays,
      this.payment_method,
      this.car_id);

    return this.http.post<Reservation>(
      `http://${backendHost}:${backendServicePort}/reservations`,
      reservation,
      this.httpOptions);
  }

}
