import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { DashboardComponent } from '../../page/dashboard/dashboard.component'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DashboardComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeDashboardComponent {

  authToken: string = '';
  decodedToken: any = null;
  userId: string = '';  // Declarar la propiedad userId
  userAccount : string = '' ;
  userEmail: string = '';  // Declarar la propiedad userEmail
  rol: string = '';  // Declarar la propiedad rol
  createDate: string = '';  // Declarar la propiedad createDate


  constructor(
    private router: Router,
    private httpClient: HttpClient

  ) { }

  ngOnInit() {
    // Verificar si localStorage está disponible
    if (typeof localStorage !== 'undefined') {
      // Recuperar el token del localStorage al inicializar el componente
      this.authToken = localStorage.getItem('authToken') || '';
  
      if (this.authToken) {
        const decodedToken = this.decodeToken(this.authToken);
  
        // Asignar valores a variables
        const userId = decodedToken.userId;
        const userAccount = decodedToken.userAccount;
        const userEmail = decodedToken.userEmail;
        const rol = decodedToken.rol;
        const createDate = decodedToken.createDate;
  
        // Asignar estas variables a propiedades de tu componente
        this.userId = userId;
        this.userAccount = userAccount;
        this.userEmail = userEmail;
        this.rol = rol;
        this.createDate = createDate;
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
