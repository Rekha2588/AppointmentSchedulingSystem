import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../Services/authorization.service';
import { Login } from '../../../Models/login';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: Login;
  router = inject(Router);
  authService = inject(AuthorizationService);
  
  constructor() {
    this.user = new Login();
  }

  register() {    
    this.authService.register(this.user).subscribe((res: any) => {      
      console.log(res);
      this.router.navigateByUrl('/login');
    }, err => {
      console.log('Error Message: ' + err.error);
      console.log('Error Response Code: ' + err.status);
      console.log('Error Response Text: ' + err.statusText);
      alert(err.error);
    });
  }

}
