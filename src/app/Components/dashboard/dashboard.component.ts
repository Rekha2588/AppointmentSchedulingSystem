import { Component, inject, OnInit } from '@angular/core';
import { AppointmentService } from '../../Services/appointment.service';
import { Appointment } from '../../../Models/appointment';
import { CommonModule, formatDate } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {  
  appointments: Appointment[] = [];
  date: Date = new Date();
  currentDate:string = formatDate(this.date,'yyyy-MM-dd', "en-US");
  selectedDate:string = '';

  appointmentService = inject(AppointmentService);
  router = inject(Router);

  ngOnInit(): void {
    this.selectedDate = this.currentDate;
    this.loadAppointmentsByDate(this.selectedDate);
  }

  loadAppointmentsByDate(selectedDate:string) {    
    this.appointmentService.getAppointmentsByDate(selectedDate).subscribe((res: Appointment[]) => {
      this.appointments = res;
    }, err => {
      console.log('Error Message: ' + err.error);
      console.log('Error Response Code: ' + err.status);
      console.log('Error Response Text: ' + err.statusText);
    });
  }

  createAppointment(){
    this.router.navigateByUrl('/home/create');
  }

  editAppointment(appointment: Appointment){
    this.router.navigate(['/home/edit'], { queryParams: { appointment: JSON.stringify(appointment) } });
  }

  reloadDashboard(){
    this.loadAppointmentsByDate(this.selectedDate);
  }

  deleteAppointment(appointmentId: number){
    const isDelete = confirm("Are you sure you want to cancel the appointment?");
    if(isDelete){
      this.appointmentService.deleteAppointment(appointmentId).subscribe(res => {
        console.log(res);
        alert("Appointment cancelled");
        this.appointments = this.appointments.filter(item => item.appointmentId != appointmentId);
      },
      err => {
        console.log(err);
        alert(err.statusText);
      });      
    }    
  }  
}
