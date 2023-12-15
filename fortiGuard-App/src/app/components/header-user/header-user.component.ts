import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../page/dashboard/dashboard.component'

@Component({
  standalone: true,
  imports: [
    DashboardComponent
 
  ],
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {


  

}