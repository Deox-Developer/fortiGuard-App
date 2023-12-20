import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { NavUserComponent } from '../../components/nav-user/nav-user.component';
import { HomeUserComponent } from '../../components/home-user/home-user.component';
import { DevicesComponent } from '../../components/devices/devices.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { CustomersComponent } from '../../components/customers/customers.component';
import { RolesComponent } from '../../components/roles/roles.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavUserComponent,
    HomeUserComponent,
    DevicesComponent,
    ProfileComponent,
    CustomersComponent,
    RolesComponent
  
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {

  @Input() userAccount = ''
  userId: number | null = null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthenticationService,
    
  ) { }


  ngOnInit(): void {
    // Verificar si la cookie está presente
    const authTokenKey = this.authService.getAuthTokenKey();
    const authToken = this.cookieService.get(authTokenKey);

    if (authToken) {
      // Realizar acciones adicionales si la cookie está presente
      const decodedToken = this.authService.decodeToken(authToken);

      //console.log('token: '+authToken)
      // Acceder a las propiedades del token decodificado
      ///const alg = decodedToken.decodedHeader.alg;
      //const typ = decodedToken.decodedHeader.typ;

      //  const createDate = decodedToken.decodedPayload.createDate;
      // const exp = decodedToken.decodedPayload.exp;
      // const iat = decodedToken.decodedPayload.iat;
      // const userAccount = decodedToken.decodedPayload.userAccount;
      // const userEmail = decodedToken.decodedPayload.userEmail;
      // const userRole = decodedToken.decodedPayload.userRole;
      // Realizar acciones adicionales según las propiedades del token
      // Por ejemplo, puedes usar userId en un servicio
    } else {
      // Redirigir a la página de autenticación si la cookie no está presente
      //console.log('Token no encontrado en la cookie. Redirigiendo a la página de autenticación.');
      this.router.navigate(['/auth']);
    }
  }

  logout(): void {
    // Llama al método de cerrar sesión en el servicio AuthenticationService
    this.authService.logout();
  }
}