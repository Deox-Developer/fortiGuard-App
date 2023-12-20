import { Component } from '@angular/core';
import { HeadersComponent } from '../../components/headers/headers.component';
import { FootersComponent } from '../../components/footers/footers.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeadersComponent,
    FootersComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  namePage = 'Home'

}
