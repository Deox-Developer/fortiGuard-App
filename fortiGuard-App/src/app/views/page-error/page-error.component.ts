import { Component } from '@angular/core';
import { HeadersComponent } from '../../components/headers/headers.component';
import { FootersComponent } from '../../components/footers/footers.component';

@Component({
  selector: 'app-page-error',
  standalone: true,
  imports: [
    HeadersComponent,
    FootersComponent
  ],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.css'
})
export class PageErrorComponent {
  namePage = '404'
}
