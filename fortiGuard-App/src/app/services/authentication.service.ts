import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  ) {}

  public performLogin(formDataAuth: any): Promise<any> {
    return this.httpClient
      .post<any>('http://localhost:3000/api/login/singin/', formDataAuth, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .toPromise()
      .catch(this.handleError);
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
      this.setCookie(this.authTokenKey, token, { httpOnly: true });
      this.router.navigate([redirectPath]);
    } else {
      console.error('Los datos del token no fueron recibidos...');
    }
  }

  private setCookie(name: string, value: string | false, options: any): void {
    if (value === false) {
      this.cookieService.delete(name, '/');
    } else {
      this.cookieService.set(name, value, options);
    }
  }

  public getAuthTokenKey(): string {
    return this.authTokenKey;
  }

  public async logout(): Promise<void> {
    try {
      const authToken = this.cookieService.get(this.authTokenKey);

      if (authToken) {
        await this.httpClient.post<any>('http://localhost:3000/api/login/logout', {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }).toPromise();

        this.cookieService.delete(this.authTokenKey, '/');
        console.log('Token eliminado de la cookie');

        this.router.navigate(['/auth']);
        location.reload();
      }
    } catch (error) {
      console.error('Error al hacer logout en el backend:', error);
      await this.clearSession();
    }
  }

  private async clearSession(): Promise<void> {
    this.cookieService.delete(this.authTokenKey, '/');
    this.router.navigate(['/login']);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error en la solicitud HTTP:', error);
    if (error && error.error && error.error.message) {
      console.log('Mensaje de error del servidor:', error.error.message);
    }
    return Promise.reject(error);
  }
}