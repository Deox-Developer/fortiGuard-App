import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account'
import { Role } from '../models/role';



@Injectable({
  providedIn: 'root'
})


export class ProfileService {
  constructor(private httpClient: HttpClient) { }

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

      // Verificar si la respuesta es undefined
      if (response === undefined) {
        // Puedes manejar este caso según tus necesidades.
        throw new Error('La respuesta del servidor es undefined.');
      }
      return response;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw error;
    }
  }

  async getAllAccounts(authTokenKey: string): Promise<Account[] | undefined> {
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

      // Verificar si la respuesta es undefined
      if (response === undefined) {
        // Puedes manejar este caso según tus necesidades.
        throw new Error('La respuesta del servidor es undefined.');
      }

      return response;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw error;
    }
  }


  async getAllRole(authTokenKey: string): Promise<Role[] | undefined> {
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

      // Verificar si la respuesta es undefined
      if (response === undefined) {
        // Puedes manejar este caso según tus necesidades.
        throw new Error('La respuesta del servidor es undefined.');
      }

      return response;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw error;
    }
  }
}