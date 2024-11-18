import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable } from 'rxjs';
import { Appointment } from '../../Models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }

  http = inject(HttpClient);    

  getAppointmentsByDate(date: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('date', date);

    return this.http.get(environment.appointmentApiUrl + '/GetAppointmentsByDate', { params: queryParams })
      .pipe(catchError(err => { throw err; }));
  }

  createAppointment(appointment: Appointment):Observable<any>{       
    return this.http.post(environment.appointmentApiUrl + '/CreateAppointment', appointment)
      .pipe(catchError(err => { throw err }));
  }

  rescheduleAppointment(appointment: Appointment):Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('appointmentId', appointment.appointmentId);
    return this.http.put(environment.appointmentApiUrl + '/RescheduleAppointment', appointment, { params: queryParams })
      .pipe(catchError(err => { throw err }));
  }

  deleteAppointment(appointmentId:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('appointmentId', appointmentId);
    return this.http.delete(environment.appointmentApiUrl + '/CancelAppointment', { params: queryParams })
    .pipe(catchError(err => { throw err }));
  }
}
