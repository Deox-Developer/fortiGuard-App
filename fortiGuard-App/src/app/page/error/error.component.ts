import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'
import {FooterComponent} from '../../components/footer/footer.component'

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
