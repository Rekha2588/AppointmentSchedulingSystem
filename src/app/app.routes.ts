import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { EditappointmentComponent } from './Components/editappointment/editappointment.component';
import { CreateappointmentComponent } from './Components/createappointment/createappointment.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: 'home', 
        component: HomeComponent,
        children : [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'patients', component: PatientsComponent },
            { path: 'edit', component: EditappointmentComponent },
            { path: 'create', component: CreateappointmentComponent }
        ]
    }
];
