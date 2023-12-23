import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterAccountService } from '../../services/register-acount.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
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
  idIdentification: number | null = null;
  numIdentification = '';
  phone: number | null = null;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private registerAccountService: RegisterAccountService,
    private router: Router
  ) { }

  async sendData(): Promise<void> {
    try {
      const person = await this.registerAccountService.performRegisterPerson({
        names: this.names,
        lastNames: this.lastNames,
        idIdentification: this.idIdentification != null ? +this.idIdentification : null,
        numIdentification: this.numIdentification,
        phone: this.phone != null ? +this.phone : null,
      });

      const formDataAuthAcc = {
        email: this.email,
        password: this.password,
        nameAccount: this.nameAccount,
        roleAccount: this.idRole,
        idPerson: person.idPerson
      };

      const response = await this.registerAccountService.performRegisterAcc(formDataAuthAcc);

      if (response) {
        this.successMessage = 'Account registered successfully!';
        setTimeout(() => {
          this.hideMessages();
          this.router.navigate(['/dashboard']);
          location.reload();
        }, 5000); // Ocultar el mensaje de éxito y redirigir después de 5 segundos
      } else {
        this.errorMessage = 'Account not registered, please try again.';
        setTimeout(() => {
          this.hideMessages();
        }, 5000); // Ocultar el mensaje de error después de 5 segundos
      }

    } catch (error) {
      console.error('Error creating account:', error);
      this.errorMessage = 'Error creating account. Please try again.';
      setTimeout(() => {
        this.hideMessages();
      }, 5000); // Ocultar el mensaje de error después de 5 segundos
    }
  }

  hideMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}