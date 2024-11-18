import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable } from 'rxjs';
import { Appointment } from '../../Models/appointment';
import { Patient } from '../../Models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatientByLastNameAndDateOfBirth(lastName:string, dateOfBirth: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('lastName', lastName);
    queryParams = queryParams.append('dateOfBirth', dateOfBirth);

    return this.http.get(environment.patientApiUrl + '/GetPatientByLastNameAndDateOfBirth', { params: queryParams })
      .pipe(catchError(err => { throw err; }));
  }
}
