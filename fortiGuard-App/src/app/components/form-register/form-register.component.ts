import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterAcountService } from '../../services/register-acount.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {

  email = '';
  password = '';
  nameAccount = '';
  idRole = 2;
  names = '';
  lastNames = '';
  idIdentification : number | null = null;
  numIdentification = '';
  phone: number | null = null;


  constructor(
    private registerAcountService: RegisterAcountService,
    private router : Router
  ) { }

  async sendData(): Promise<void> {
    try {
      // Llamada a performRegisterPerson
      const person = await this.registerAcountService.performRegisterPerson({
        names: this.names,
        lastNames: this.lastNames,
        idIdentification: this.idIdentification != null ? +this.idIdentification : null,
        numIdentification: this.numIdentification,
        phone: this.phone != null ? +this.phone : null,
      });

      // Llamada a performRegisterAcc después de que performRegisterPerson se complete
      const formDataAuthAcc = {
        email: this.email,
        password: this.password,
        nameAccount: this.nameAccount,
        roleAccount: this.idRole,
        idPerson: person.idPerson
      };

      // Realizar la llamada y esperar a que se complete
      const response = await this.registerAcountService.performRegisterAcc(formDataAuthAcc);

      if (response){
        this.router.navigate(['/dashboard'])
        location.reload();
      }else{
        console.log('Cuenta no registrada, intentalo nuevamente!')
      }
      // Llamada a performLogin después de que performRegisterAcc se complete
      //const formDataAuth = {
      //  email: this.email,
      //  password: this.password
      //};
      
      // Realizar la llamada y esperar a que se complete
      //const loginResponse = await this.authenticationService.performLogin(formDataAuth);

      // Realizar acciones adicionales después de la solicitud de inicio de sesión, si es necesario
      //const token = loginResponse.token;
      //this.authenticationService.storeTokenAndRedirect(token);

      // Resto del código...
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      // Manejar el error si es necesario
    }
  }
}