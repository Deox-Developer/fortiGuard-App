import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../components/header-user/header-user.component';
import { LoginComponent } from '../../page/login/login.component'
import { Router } from '@angular/router';
import { HomeDashboardComponent } from '../../components/home/home.component'
import { DashboardComponentApp } from '../../components/dashboard/dashboard.component'
import { OrdersComponent } from '../../components/orders/orders.component'
import { ProductsComponent } from '../../components/products/products.component'
import { AppsComponent } from '../../components/apps/apps.component'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderUserComponent,
    LoginComponent,
    HomeDashboardComponent,
    DashboardComponentApp,
    OrdersComponent,
    ProductsComponent,
    AppsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: 'dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  authToken: string = '';
  decodedToken: any = null;
  userId: string = '';  // Declarar la propiedad userId
  userAccount: string = '';
  userEmail: string = '';  // Declarar la propiedad userEmail
  rol: string = '';  // Declarar la propiedad rol
  createDate: string = '';  // Declarar la propiedad createDate

  constructor(
    private router: Router,
    private httpClient: HttpClient,

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


  destroyToken() {
    // Obtener el token del localStorage
    const authToken = localStorage.getItem('authToken');

    // Verificar si el token existe
    if (authToken) {
      // Eliminar el token del localStorage
      localStorage.removeItem('authToken');

      // Hacer una solicitud al backend para cerrar sesión
      this.httpClient.post<any>('http://localhost:3000/api/login/logout', {})
        .subscribe(
          (response) => {
            console.log('Respuesta de la API (logout):', response);
          },
          (error) => {
            console.error('Error al hacer logout en el backend:', error);
          }
        );
    }
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}