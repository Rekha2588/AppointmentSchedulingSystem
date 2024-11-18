import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';
import { Login } from '../../Models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  http = inject(HttpClient);

  login(user: Login): Observable<any> {
    return this.http.post<Login>(environment.authApiUrl + '/login', user)
    .pipe(catchError(err => {throw err;}));
  }

  register(user: Login): Observable<any> {
    return this.http.post<Login>(environment.authApiUrl + '/register', user)
    .pipe(catchError(err => {throw err;}));
  }

}
