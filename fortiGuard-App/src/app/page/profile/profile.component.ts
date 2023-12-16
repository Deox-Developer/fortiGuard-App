import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../components/header-user/header-user.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { ProfileComponentUser } from '../../components/profile/profile.component'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderUserComponent,
    ProfileComponentUser
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authToken: string = '';
  userId: string = '';
  userAccount: string = '';
  userEmail: string = '';
  rol: string = '';
  createDate: string = '';

  constructor(private httpClient: HttpClient, private router: Router) {
    // Llama a la función de verificación de token en el constructor
    this.verificarToken();
  }

  ngOnInit(): void {
    // Puedes llamar a la función de verificación de token aquí si lo prefieres
    // this.verificarToken();
  }

  cerrarSesion(): void {
    // Llama a la función destroyToken del DashboardComponent
    const dashboardComponent = new DashboardComponent(this.router, this.httpClient);
    dashboardComponent.destroyToken();
  }

  private verificarToken(): void {
    // Verificar si localStorage está disponible
    if (typeof localStorage !== 'undefined') {
      // Recuperar el token del localStorage al inicializar el componente
      this.authToken = localStorage.getItem('authToken') || '';

      if (this.authToken) {
        const decodedToken = this.decodeToken(this.authToken);

        // Asignar valores a variables
        this.userId = decodedToken.userId;
        this.userAccount = decodedToken.userAccount;
        this.userEmail = decodedToken.userEmail;
        this.rol = decodedToken.rol;
        this.createDate = decodedToken.createDate;
      } else {
        // Manejar la situación en la que el token no está presente
        console.error('Token no encontrado en el localStorage.');

        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      }
    } else {
      // Manejar la situación en la que localStorage no está disponible
      console.error('localStorage no está disponible en este entorno.');

      // Redirigir al usuario a la página de inicio de sesión u otra acción según sea necesario
      this.router.navigate(['/login']);
    }
  }

  private decodeToken(token: string): any {
    try {
      // Decodificar el token sin usar jwt_decode
      // Aquí implementarías tu lógica de decodificación manual del token
      // Por ejemplo, podrías dividir el token por puntos y decodificar la parte que contiene la información
      const tokenParts = token.split('.');
      const decodedToken = JSON.parse(atob(tokenParts[1]));
      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
