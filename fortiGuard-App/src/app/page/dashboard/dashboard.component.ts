import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../components/header-user/header-user.component';
import { LoginComponent } from '../../page/login/login.component'
import { Router } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component'
import { DashboardComponentApp } from '../../components/dashboard/dashboard.component'
import { OrdersComponent } from '../../components/orders/orders.component'
import { ProductsComponent } from '../../components/products/products.component'
import { AppsComponent } from '../../components/apps/apps.component'
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderUserComponent,
    LoginComponent,
    HomeComponent,
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

  constructor(
    private router: Router,
    private httpClient: HttpClient

  ) { }

  ngOnInit() {
    // Recuperar el token del localStorage al inicializar el componente
    this.authToken = localStorage.getItem('authToken') ?? '';

    // Verificar si el token está presente y realizar acciones adicionales si es necesario
    if (this.authToken) {
      // Decodificar el token sin usar jwt_decode
      this.decodedToken = this.decodeToken(this.authToken);

      // Realizar acciones adicionales con el token decodificado si es necesario
      console.log('Token recuperado:', this.decodedToken);
    } else {
      // Manejar la situación en la que el token no está presente
      console.error('Token no encontrado en el localStorage.');

      // Redirigir al usuario a la página de inicio de sesión
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