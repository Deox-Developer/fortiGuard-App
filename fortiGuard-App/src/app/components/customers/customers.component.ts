import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../../services/profile.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FormUpdateAccountComponent } from '../form-update-account/form-update-account.component';
import { FormRegisterComponent } from '../form-register/form-register.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormUpdateAccountComponent, FormRegisterComponent, CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  
  idUpdateAcc: number | null = null;
  account: Account[] | undefined;  // Cambiado el tipo a 'Account | undefined'
  authToken: string = ''
  
  constructor(
    private cookieService: CookieService,
    private profileService: ProfileService,
    private authService: AuthenticationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.refreshTable();
  }

  async refreshTable(): Promise<void> {
    const authTokenKey = this.authService.getAuthTokenKey();
    const authToken = this.cookieService.get(authTokenKey);
    if (authToken) {
      try {
        const allAccounts = await this.profileService.getAllAccounts(authToken);
        if (allAccounts !== undefined) {
          this.account = allAccounts;
        } else {
          console.error('La respuesta del servidor es undefined.');
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    } else {
      // Manejar el caso en el que no se obtuvo el token de autenticación
    }
  }

  saveDataAcc(idUpdateAcc: number): void {
    this.profileService.saveDataAcc(idUpdateAcc);
    console.log(idUpdateAcc);
    this.refreshTable();
  }

  async deletAcc(idAccToDelete: number, idPersonToDelete: number, authToken: string): Promise<void> {
    console.log('ID de cuenta:', idAccToDelete);
    console.log('ID de persona:', idPersonToDelete);
    await this.profileService.deleteAccount(idAccToDelete, idPersonToDelete, authToken);
    this.refreshTable();
  }
}
