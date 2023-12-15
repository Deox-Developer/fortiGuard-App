import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './page/home/home.component'
import {ErrorComponent } from './page/error/error.component'
import {ServicesComponent } from './page/services/services.component'
import {AboutComponent} from './page/about/about.component'
import {LoginComponent} from './page/login/login.component'
import {DashboardComponent } from './page/dashboard/dashboard.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    HomeComponent,
    ErrorComponent,
    ServicesComponent,
    AboutComponent,
    LoginComponent,
    DashboardComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fortiGuard-App';
}
