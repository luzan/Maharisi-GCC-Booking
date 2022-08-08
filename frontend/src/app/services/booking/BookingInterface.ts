export interface Booking {
    _id?: string;
    userId?: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: number;

    bookingFor: string;
    roomType: string;

    checkOutDate: number;
    checkInDate: number;

    purposeOfStay: string;
    accessibleRequired: boolean;
    occcupants: number;

    arrivalTime?: number;
    numberOfGuests?: number;

    paidInCash?: boolean;
    discountType?: string;
    discountOf?: number;

}