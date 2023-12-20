import { Component } from '@angular/core';
import { HeadersComponent } from '../../components/headers/headers.component';
import { FootersComponent } from '../../components/footers/footers.component';
import { FormRegisterComponent } from '../../components/form-register/form-register.component';

@Component({
  selector: 'app-register-acount',
  standalone: true,
  imports: [
    HeadersComponent,
    FootersComponent,
    FormRegisterComponent
  ],
  templateUrl: './register-acount.component.html',
  styleUrl: './register-acount.component.css'
})
export class RegisterAcountComponent {

  namePage = 'RegisterAccount'

}
