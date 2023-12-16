import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderUserComponent } from '../../components/header-user/header-user.component';
import { LoginComponent } from '../../page/login/login.component';
import { Router } from '@angular/router';
import { HomeDashboardComponent } from '../../components/home/home.component';
import { DashboardComponentApp } from '../../components/dashboard/dashboard.component';
import { OrdersComponent } from '../../components/orders/orders.component';
import { ProductsComponent } from '../../components/products/products.component';
import { AppsComponent } from '../../components/apps/apps.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';



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

export class DashboardComponent implements OnInit, OnDestroy {
  authToken: string = '';
  decodedToken: any = null;
  userId: string = '';
  userAccount: string = '';
  userEmail: string = '';
  rol: string = '';
  createDate: string = '';
  isServer: boolean = false;  // Agrega esta línea para almacenar si estás en el lado del servidor


  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) {
    this.isServer = typeof localStorage === 'undefined';
  }

  ngOnInit() {
    this.verificarToken();
  }

  public decodeToken(token: string): any {
    try {
      const tokenParts = token.split('.');
      const decodedToken = JSON.parse(atob(tokenParts[1]));
      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  public destroyToken(): void {
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': authToken || '',
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
          console.error('Error al hacer logout en el backend:', error);
        }
      );
  }

  public verificarToken(): void {
    const authToken = localStorage.getItem('authToken') || '';

    if (authToken) {

      this.decodedToken = this.decodeToken(authToken);
      this.userId = this.decodedToken.userId;
      this.userAccount = this.decodedToken.userAccount;
      this.userEmail = this.decodedToken.userEmail;
      this.rol = this.decodedToken.rol;
      this.createDate = this.decodedToken.createDate;
    } else {
      console.error('Token no encontrado en el localStorage.');
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.destroyToken()
  }

}