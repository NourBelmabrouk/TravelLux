import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const backendHost = environment.BACKEND_HOST || "localhost";
const backendServicePort = environment.BACKEND_PORT || 3000;
const AUTH_API = `http://${backendHost}:${backendServicePort}`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    residence: string,
    adress: string,
    phonenumber: string,
    dateOfBirth: string,
    selectFile: any
  ): Observable<any> {
    let formData = new FormData();
    let user = {
      username,
      email,
      password,
      firstname,
      lastname,
      residence,
      adress,
      phonenumber,
      dateOfBirth,
    };

    formData.append('email',email );
    formData.append('username',username );
    formData.append('phonenumber',phonenumber );
    formData.append('firstname',firstname );
    formData.append('lastname',lastname );
    formData.append('dateOfBirth',dateOfBirth );
    formData.append('residence',residence );
    formData.append('adress',adress );
    formData.append('password',password );
    formData.append('image', selectFile);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',

      },
    };

    console.log(AUTH_API);
    return this.http.post(AUTH_API + '/users', formData);
  }
}
