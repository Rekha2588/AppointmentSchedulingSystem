import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../../Models/appointment';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../Services/appointment.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-editappointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editappointment.component.html',
  styleUrl: './editappointment.component.css'
})
export class EditappointmentComponent implements OnInit {
  appointment: Appointment = new Appointment();
  route = inject(ActivatedRoute);
  router = inject(Router);
  appointmentService = inject(AppointmentService);

  ngOnInit(): void {    
    this.route.queryParamMap.subscribe((params: any) => {
      this.appointment = JSON.parse(params.params.appointment);
    });
  }

  rescheduleAppointment(appointment: Appointment) { 
    this.appointment.startTime = formatDate(this.appointment.startTime, 'yyyy-MM-dd HH:mm:ss', "en-US");
    this.appointment.endTime = formatDate(this.appointment.endTime, 'yyyy-MM-dd HH:mm:ss', "en-US");      
    this.appointmentService.rescheduleAppointment(appointment).subscribe(res => {
      console.log(res);
      alert("Appointment rescheduled successfully");
      this.router.navigateByUrl('/home/dashboard');
    },
      err => {
        console.log(err);
        alert(err.statusText);
      });      
  }
}
