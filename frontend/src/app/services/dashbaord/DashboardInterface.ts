export interface Dashboard {
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

    discountOf: number;
    
    occcupants: string;
    paidInCash: string;
}