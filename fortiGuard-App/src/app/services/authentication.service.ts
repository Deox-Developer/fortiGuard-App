import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly loggedInKey = 'isLoggedIn';
  private readonly authTokenKey = 'authToken';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  public async performLogin(formDataAuth: any): Promise<any> {
    try {
      const response = await this.httpClient
        .post<any>('http://localhost:3000/api/login/singin/', formDataAuth, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

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

  public decodeToken(token: string): any {
    const [header, payload] = token.split('.').map((part) => this.base64Decode(part));
    return { decodedHeader: JSON.parse(header), decodedPayload: JSON.parse(payload) };
  }

  private base64Decode(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    return atob(str);
  }

  public storeTokenAndRedirect(token: string, redirectPath: string = '/dashboard'): void {
    if (token) {
      // Almacena el token en la cookie u otro medio de almacenamiento si es necesario
      // Puedes usar el método setCookie que ya has implementado

      // Por ejemplo:
      this.setCookie(this.authTokenKey, token, { httpOnly: true });

      // Redirige a la ruta especificada
      this.router.navigate([redirectPath]);
    } else {
      console.error('Los datos del token no fueron recibidos...');
    }
  }

  private setCookie(name: string, value: string | false, options: any): void {
    if (value === false) {
      // Elimina la cookie
      this.cookieService.delete(name, '/');
    } else {
      // Establece la cookie
      this.cookieService.set(name, value, options);
    }
  }

  public getAuthTokenKey(): string {
    return this.authTokenKey;
  }

  public async logout(): Promise<void> {
    try {
      // Obtén el token almacenado en la cookie
      const authToken = this.cookieService.get(this.authTokenKey);

      // Verifica si el token existe antes de enviar la solicitud al backend
      if (authToken) {
        // Envía el token en el header de la solicitud al backend para cerrar sesión
        await this.httpClient.post<any>('http://localhost:3000/api/login/logout', {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }).toPromise();

        // Elimina el token de la cookie
        this.cookieService.delete(this.authTokenKey, '/');
        console.log('Token eliminado de la cookie');

        // Redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/auth']);
        location.reload();
      }
    } catch (error) {
      console.error('Error al hacer logout en el backend:', error);
      // Aunque ocurra un error en el backend, aún deberías limpiar la sesión del cliente
      await this.clearSession();
    }
  }

  private async clearSession(): Promise<void> {
    // Elimina el token de la cookie
    this.cookieService.delete(this.authTokenKey, '/');
    //console.log('Token eliminado de la cookie');

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }


}


