import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/authentication.service';


@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {

  authService = inject(AuthenticationService)

  dataFormLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  dataSend(): void {
    this.authService.testing(this.dataFormLogin)
  }

}
