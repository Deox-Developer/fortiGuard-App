import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { HeaderComponent } from '../../components/header/header.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-account',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FormsModule
  ],
  templateUrl: './register-account.component.html',
  styleUrl: './register-account.component.css'
})

export class RegisterAccountComponent {

  nameAccount: string = '';
  email: string = '';
  password: string = '';
  roleAccount: number = 1;
  errorMessage: string = ''

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }



  registerAccount() {
    // Crear un objeto con la información del formulario
    const accountData = {
      nameAccount: this.nameAccount,
      email: this.email,
      password: this.password,
      roleAccount: this.roleAccount
    };

    console.log(accountData)

    this.httpClient.post<any>('http://localhost:3000/api/accounts/createAccount', accountData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).subscribe(
      (response) => {
        //console.log('Respuesta de la API:', response);
        // Resto de la lógica exitosa
        if (response && response.token) {
          const token = response.token;

          localStorage.setItem('authToken', token);  
          // Esperar 6 segundos antes de redirigir al dashboard
          setTimeout(() => {
            // Redirige a la página deseada después de 6 segundos
            this.router.navigate(['/dashboard']);
          }, 6000)
        }
      },
      (error: any) => {

        console.error('Error al enviar datos a la API:', error);

        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error desconocido.';
        }
      }
    );

  }
}
