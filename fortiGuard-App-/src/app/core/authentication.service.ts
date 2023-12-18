import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  API_URL = 'http://localhost:3000/api/login/singin';
  constructor(private httpClient: HttpClient) { }

  testing(formulario: FormGroup) {
    console.log(formulario.valid)
    return this.httpClient.post(`${this.API_URL}`, formulario.value);
  }
}