import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PageErrorComponent } from './views/page-error/page-error.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegisterAcountComponent } from './views/register-acount/register-acount.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'auth', component: LoginComponent },
    { path: 'register', component: RegisterAcountComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageErrorComponent }
];
