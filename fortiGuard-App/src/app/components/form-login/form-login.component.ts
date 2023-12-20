import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})

export class FormLoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
  ) { }

  sendData(): void {
    // Crear un objeto con los datos actuales
    const formDataAuth = {
      email: this.email,
      password: this.password
    };

    // Llamar al método performLogin del servicio
    this.authService.performLogin(formDataAuth)
      .then(response => {
        // Realizar acciones adicionales después de la solicitud de inicio de sesión, si es necesario
        //console.log('Solicitud de inicio de sesión exitosa:', response);

        // Decodificar el token
        const token = response.token;
        this.authService.storeTokenAndRedirect(token);
      })
      .catch(error => {
        // Manejar el error de la solicitud de inicio de sesión, si es necesario
        console.error('Error en la solicitud de inicio de sesión:', error);
      });
  }
}