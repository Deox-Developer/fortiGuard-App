import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthComponent } from '../../components/auth/auth.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ FooterComponent,HeaderComponent,AuthComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  namePage: string = 'Dashboard'

  
}
