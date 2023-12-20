import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../../models/account';
import { Person } from '../../models/person';
import { Role } from '../../models/role';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userId: number | null = null;
  account: Account[] | undefined;  // Cambiado el tipo a 'Account | undefined'
  person: Person | undefined;    // Cambiado el tipo a 'Person | undefined'
  role: Role | undefined;        // Cambiado el tipo a 'Role | undefined'

  constructor(
    private cookieService: CookieService,
    private profileService: ProfileService,
    private authService: AuthenticationService
  ) { }

  async ngOnInit(): Promise<void> {
    const authTokenKey = this.authService.getAuthTokenKey();
    const authToken = this.cookieService.get(authTokenKey);

    if (authToken) {
      const decodedToken = this.authService.decodeToken(authToken);
      const userId = decodedToken.decodedPayload.userId;

      try {
        const response = await this.profileService.getDataForUser(userId, authToken);

        // Verificar si response es undefined antes de asignar a this.account y otras propiedades
        if (response !== undefined) {
          this.account = response;
          //console.log(this.account)


          // Ahora puedes acceder a this.account, this.person, this.role en tu componente

        } else {
          console.error('La respuesta del servidor es undefined.');
          // Manejar este caso según tus necesidades
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Manejar el error según sea necesario
      }
    } else {
      //console.log('Error in profile component. Please check your server connection.');
    }
  }
}

