import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterAccountService {
  constructor(private httpClient: HttpClient) {}

  public async performRegistration(formDataAuthPerson: any, formDataAuthAcc: any): Promise<boolean> {
    try {
      // Realizar el registro de la persona
      const personResponse = await this.performRegisterPerson(formDataAuthPerson);
      
      // Verificar si la respuesta de performRegisterPerson es válida antes de continuar
      if (!personResponse || personResponse.error) {
        throw new Error('Error al registrar la persona');
      }

      // Realizar el registro de la cuenta utilizando el ID de la persona registrada
      const formDataAuthAccWithPersonId = {
        ...formDataAuthAcc,
        idPerson: personResponse.idPerson
      };

      const accountResponse = await this.performRegisterAcc(formDataAuthAccWithPersonId);

      // Verificar si la respuesta de performRegisterAcc es válida antes de continuar
      if (!accountResponse || accountResponse.error) {
        throw new Error('Error al registrar la cuenta');
      }

      // Ambas operaciones fueron exitosas, puedes retornar true para indicar éxito
      return true;
    } catch (error) {
      // Manejar el error de manera adecuada (puedes agregar lógica adicional si es necesario)
      console.error('Error durante el proceso de registro:', error);
      return false; // Retorna false para indicar que hubo un error
    }
  }

  public performRegisterPerson(formDataAuthPerson: any): Promise<any> {
    return this.httpClient
      .post<any>('http://localhost:3000/api/persons/createPerson', formDataAuthPerson, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .toPromise()
      .catch(this.handleError);
  }

public performRegisterAcc(formDataAuthAcc: any): Promise<any> {
  return this.httpClient
    .post<any>('http://localhost:3000/api/accounts/createAccount', formDataAuthAcc, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .toPromise()
    .catch(this.handleError);
}

  private handleError(error: any): Promise<any> {
    console.error('Error en la solicitud HTTP:', error);
    if (error && error.error && error.error.message) {
      console.log('Mensaje de error del servidor:', error.error.message);
    }
    return Promise.reject(error);
  }
}