import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})


@Injectable({
  providedIn: 'root',
})

export class AuthComponent {
  private readonly TOKEN_KEY = 'authToken';
  errorMessage: string = '';
  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  constructor(private httpClient: HttpClient, private router: Router) {

    this.validateToken();
   }

  sendDataForm(): void {
    if (this.formLogin.valid) {
      const credentials = this.formLogin.value;

      this.httpClient.post<any>('http://localhost:3000/api/login/singin/', credentials, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }).subscribe(
        (response) => {
          const token = response?.token;
          token ? this.handleSuccessfulLogin(token) : this.handleInvalidToken();
        },
        (error: any) => {
          this.handleApiError(error);
        }
      );
    }
  }

  private handleSuccessfulLogin(token: string): void {
    this.storeToken(token);
    this.validateToken();
  }

  private handleInvalidToken(): void {
    console.error('La respuesta no contiene un token válido.');
  }

  private handleApiError(error: any): void {
    console.error('Error al enviar datos a la API:', error);

    if (error.error && error.error.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = 'Error desconocido.';
    }
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  
  private validateToken(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (token) {
      // Token válido, no se hace nada especial
      //console.log('Token válido:', token);
      this.router.navigate(['/dashboard']);
    } else {
      // Token no válido, redirigir a la página de login
      console.error('Token no válido. Redirigiendo a la página de login.');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {

    const token = localStorage.getItem(this.TOKEN_KEY);

    if (token) {
      // Elimina el token del localStorage
      localStorage.removeItem(this.TOKEN_KEY);

      // Realiza la solicitud de logout al backend con el token en el encabezado
      const headers = new HttpHeaders({
        'Authorization': token || '',
        'Content-Type': 'application/json'
      });

      this.httpClient.post<any>('http://localhost:3000/api/login/logout', {}, { headers })
      .subscribe(
        (response) => {
          console.log('Respuesta de la API (logout):', response);

          localStorage.removeItem('authToken');

          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al realizar el logout en el backend:', error);
        }
      );
    } else {
      console.error('No se encontró un token para incluir en el encabezado.');
    }
  }
}