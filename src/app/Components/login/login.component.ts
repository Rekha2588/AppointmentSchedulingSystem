import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../Services/authorization.service';
import { Login } from '../../../Models/login';
import { LocalstorageService } from '../../Services/localstorage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: Login;
  router = inject(Router);
  authService = inject(AuthorizationService);
  localStorageService = inject(LocalstorageService);
  constructor() {
    this.user = new Login();
  }

  signUp() {
    this.router.navigateByUrl('/register');
  }

  login() {    
    this.authService.login(this.user).subscribe((res: any) => {
      this.localStorageService.setItem('JWTToken', res.token);
      this.router.navigateByUrl('/home');
    }, err => {
      console.log('Error Message: ' + err.error);
      console.log('Error Response Code: ' + err.status);
      console.log('Error Response Text: ' + err.statusText);
      alert(err.error);
    });
  }

 }
