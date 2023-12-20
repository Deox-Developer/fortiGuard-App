import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent {
  @Input() namePage = ''
  
}
