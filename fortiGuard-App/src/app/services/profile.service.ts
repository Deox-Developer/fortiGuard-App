import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Role } from '../models/role';
import { Observable, Subject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}
  
  private idUpdateAccSubject = new Subject<number>();

  async getDataForUser(userId: number, authTokenKey: string): Promise<Account[] | undefined> {
    try {
      const response = await this.httpClient.post<Account[]>(
        'http://localhost:3000/api/accounts/viewAccount/',
        { idAccount: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authTokenKey.trim(),
          },
        }
      ).toPromise();

      return response!;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw new Error('Error al obtener datos para el usuario.');
    }
  }

  async updateAccount(userId: number, authTokenKey: string): Promise<Account[] | undefined> {
    try {
      const response = await this.httpClient.post<Account[]>(
        'http://localhost:3000/api/accounts/updateAccount/',
        { idAccount: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authTokenKey.trim(),
          },
        }
      ).toPromise();

      return response!;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw new Error('Error al actualizar la cuenta.');
    }
  }

  async getAllAccounts(authTokenKey: string): Promise<Account[]> {
    try {
      const response = await this.httpClient.get<Account[]>(
        'http://localhost:3000/api/accounts/viewAccounts',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authTokenKey.trim(),
          },
        }
      ).toPromise();

      return response!;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw new Error('Error al obtener todas las cuentas.');
    }
  }

  saveDataAcc(idUpdateAcc: number): void {
    this.idUpdateAccSubject.next(idUpdateAcc);
    console.log(idUpdateAcc);
  }

  getIdUpdateAccObservable(): Observable<number> {
    return this.idUpdateAccSubject.asObservable();
  }

  async deleteAccount(idAccount: number, idPerson: number, authToken: string): Promise<void> {
    try {
      const response = await this.httpClient.delete<void>(
        `http://localhost:3000/api/accounts/deleteAccount/${idAccount}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken.trim(),
          },
        }
      ).toPromise();
      
      // Si es necesario manejar la respuesta del servidor, puedes hacerlo aquí.
    } catch (error) {
      console.error('Error en la solicitud HTTP (Eliminar cuenta):', error);
      throw new Error('Error al eliminar la cuenta.');
    }
  }


  async getAllRole(authTokenKey: string): Promise<Role[]> {
    try {
      const response = await this.httpClient.get<Role[]>(
        'http://localhost:3000/api/roles/viewRoles',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authTokenKey.trim(),
          },
        }
      ).toPromise();

      return response!;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw new Error('Error al obtener todos los roles.');
    }
  }
}
