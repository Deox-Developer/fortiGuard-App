import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})

export class FormLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = ''; // Nueva propiedad para mensajes de éxito

  constructor(private authService: AuthenticationService) {}

  sendData(): void {
    const formDataAuth = {
      email: this.email,
      password: this.password
    };

    this.errorMessage = ''; // Limpiar el mensaje de error al enviar datos nuevamente

    this.authService.performLogin(formDataAuth)
      .then(response => {
        const token = response.token;
        this.authService.storeTokenAndRedirect(token);

        // Mostrar mensaje de éxito después de un tiempo (por ejemplo, 3 segundos)
        this.successMessage = 'Cuenta creada con éxito. Redirigiendo...';
        setTimeout(() => {
          this.hideSuccessMessage();
        }, 3000);
      })
      .catch(error => {
        this.errorMessage = error.error.error || 'Error en la solicitud de inicio de sesión. Verifica tus credenciales e inténtalo nuevamente.';
        console.error('Error en la solicitud de inicio de sesión:', error);

        // Ocultar la alerta de error después de 5 segundos (5000 milisegundos)
        setTimeout(() => {
          this.hideErrorMessage();
        }, 5000);
      });
  }

  hideErrorMessage(): void {
    this.errorMessage = '';
  }

  hideSuccessMessage(): void {
    this.successMessage = '';
  }
}