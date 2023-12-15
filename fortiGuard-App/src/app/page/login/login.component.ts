import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HeaderComponent } from '../../components/header/header.component'
import { FooterComponent } from '../../components/footer/footer.component'



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,


  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }


  onSubmit() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.httpClient.post<any>('http://localhost:3000/api/login/singin/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);

        // Verificar si hay un token en la respuesta
        if (response && response.token) {
          const token = response.token;

          // Ahora puedes hacer lo que necesites con el token, por ejemplo, guardarlo en localStorage
          localStorage.setItem('authToken', token);

          // Esperar 1 minuto (60 segundos) antes de redirigir al dashboard
          setTimeout(() => {
            // Redirige a la página deseada después de 6 segundos
            this.router.navigate(['/dashboard']);
          }, 6000);

        } else {
          console.error('La respuesta no contiene un token válido.');
          // Puedes manejar la situación donde no se recibe un token adecuadamente
        }

        // Resto de la lógica exitosa
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