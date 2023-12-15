import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'
import { FooterComponent }from '../../components/footer/footer.component'

@Component({
  selector: 'app-register-account',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './register-account.component.html',
  styleUrl: './register-account.component.css'
})
export class RegisterAccountComponent {

}
