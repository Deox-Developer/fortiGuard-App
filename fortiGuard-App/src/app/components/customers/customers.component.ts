import { Component } from '@angular/core';
import { Account } from '../../models/account';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../../services/profile.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from '../form-register/form-register.component';


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormRegisterComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})

export class CustomersComponent{
  account: Account [] | undefined;  // Cambiado el tipo a 'Account | undefined'
  constructor(
    private cookieService: CookieService,
    private profileService: ProfileService,
    private authService: AuthenticationService,
  ) {}

  async ngOnInit(): Promise<void> {
    const authTokenKey = this.authService.getAuthTokenKey();
    const authToken = this.cookieService.get(authTokenKey);

    if (authToken) {
      try {
        // Obtener todos los usuarios
        const allAccounts = await this.profileService.getAllAccounts(authToken);

        // Verificar si allAccounts es undefined antes de asignar a this.accounts
        if (allAccounts !== undefined) {
                  
          this.account = allAccounts;
          console.log(this.account)
          // Ahora puedes acceder a this.accounts en tu componente
          
        } else {
          console.error('La respuesta del servidor es undefined.');
          // Manejar este caso según tus necesidades
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
        // Manejar el error según sea necesario
      }
    } else {
      // Manejar el caso en el que no se obtuvo el token de autenticación
    }
  }
}
