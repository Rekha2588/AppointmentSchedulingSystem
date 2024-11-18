import { Component, inject } from '@angular/core';
import {Router } from '@angular/router';
import { Appointment } from '../../../Models/appointment';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../Services/appointment.service';
import { CommonModule, formatDate } from '@angular/common';
import { PatientService } from '../../Services/patient.service';


@Component({
  selector: 'app-createappointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './createappointment.component.html',
  styleUrl: './createappointment.component.css'
})
export class CreateappointmentComponent {
  appointment: Appointment = new Appointment();   
  router = inject(Router);
  appointmentService = inject(AppointmentService);
  patientService = inject(PatientService);
  

  createAppointment() { 
     this.patientService.getPatientByLastNameAndDateOfBirth(this.appointment.patient.lastName, this.appointment.patient.dateOfBirth)
     .subscribe((res:any) => { 
      this.appointment.patientId = res.patientId;
      this.appointment.patient.dateOfBirth = formatDate(res.dateOfBirth, 'yyyy-MM-dd', "en-US");
      
      this.appointmentService.createAppointment(this.appointment).subscribe(res => {
        console.log(res);
        alert("Appointment created successfully");
        this.router.navigateByUrl('/home/dashboard');
      },
      err => {
        console.log(err);
        alert(err.statusText);
      });      
    }, err => {
      console.log(err);
      alert("Patient record not found");
    });    
  }
}
