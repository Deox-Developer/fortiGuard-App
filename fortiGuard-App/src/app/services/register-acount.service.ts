import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterAcountService {

  constructor(private httpClient : HttpClient) { }

  public async performRegisterPerson(formDataAuthPerson: any): Promise<any> {
    try {
      const response = await this.httpClient
        .post<any>('http://localhost:3000/api/persons/createPerson', formDataAuthPerson, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }  
  
  public async performRegisterAcc(formDataAuthAcc: any): Promise<any> {
    try {
      const response = await this.httpClient
        .post<any>('http://localhost:3000/api/accounts/createAccount', formDataAuthAcc, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
