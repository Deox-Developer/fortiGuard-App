import { Component } from '@angular/core';
import { HeaderUserComponent } from '../../components/header-user/header-user.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderUserComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private httpClient: HttpClient, private router: Router) {
    // Puedes inyectar el DashboardComponent si necesitas acceder a sus métodos o propiedades
  }

  cerrarSesion(): void {
    // Llama a la función destroyToken del DashboardComponent
    const dashboardComponent = new DashboardComponent(this.router, this.httpClient);
    dashboardComponent.destroyToken();
  }

}
