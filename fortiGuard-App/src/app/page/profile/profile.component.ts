import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../components/header-user/header-user.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { ProfileComponentUser } from '../../components/profile/profile.component'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderUserComponent,
    ProfileComponentUser,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  authToken: string = '';
  userId: string = '';
  userAccount: string = '';
  userEmail: string = '';
  rol: string = '';
  createDate: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dashboardComponent: DashboardComponent
    ) {
      
     }

  ngOnInit(): void {
    // Puedes llamar a la función de verificación de token aquí si lo prefieres
    this.dashboardComponent.verificarToken()
  }

  destroyToken(): void {
    this.dashboardComponent.destroyToken();
  }

    



}

