import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../../services/profile.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../models/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  roles: Role [] | undefined;

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
        const allRoles = await this.profileService.getAllRole(authToken);

        // Verificar si allAccounts es undefined antes de asignar a this.accounts
        if (allRoles !== undefined) {

          this.roles = allRoles

         // console.log(this.roles)
                  
    
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
