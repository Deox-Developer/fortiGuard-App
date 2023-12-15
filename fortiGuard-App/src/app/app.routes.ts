import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component'
import { NgModel } from '@angular/forms';
import {ErrorComponent} from './page/error/error.component'
import {ServicesComponent} from './page/services/services.component'
import {AboutComponent} from './page/about/about.component'
import {LoginComponent} from './page/login/login.component'
import {DashboardComponent} from './page/dashboard/dashboard.component'
import { RegisterAccountComponent } from './page/register-account/register-account.component' 
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register', component: RegisterAccountComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Sin barra inclinada al principio
    { path: '**', component: ErrorComponent }, // Sin barra inclinada al principio
  ];