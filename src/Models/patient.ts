export class Patient {
    patientId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: number;
    emailAddress: string;
    address: string;
    city: string;
    province: string;
    zipcode: string;

    constructor() {
        this.patientId = 0;
        this.firstName = '';
        this.lastName = '';
        this.dateOfBirth = '';
        this.gender = '';
        this.contactNumber = 0;
        this.emailAddress = '';
        this.address = '';
        this.city = '';
        this.province = '';
        this.zipcode = '';
    }
}
