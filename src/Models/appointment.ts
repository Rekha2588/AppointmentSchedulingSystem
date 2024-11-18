import { Patient } from "./patient";

export class Appointment {
    appointmentId: number;
    status: number;
    startTime: string;
    endTime: string;
    patientId: number;
    patient: Patient;

    constructor() {
        this.appointmentId = 0;
        this.status = 0;
        this.startTime = '';
        this.endTime = '';
        this.patientId = 0;
        this.patient = new Patient();
    }
}
