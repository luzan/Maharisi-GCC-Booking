export interface Booking {
    _id?: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: number;  
      
    staff: string; 
    student: string;
    guest: string; 

    checkOutDate: number;
    checkInDate: number;

    purposeOfStay: string;
    accessibleRequired: string;
    occcupants: string;

    arrivalTime: number;
    numberOfGuests: number;
}