import { Component } from '@angular/core';
import { HeadersComponent } from '../../components/headers/headers.component';
import { FootersComponent } from '../../components/footers/footers.component';
import { FormLoginComponent } from '../../components/form-login/form-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeadersComponent,
    FootersComponent,
    FormLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  namePage = 'Login'

}
