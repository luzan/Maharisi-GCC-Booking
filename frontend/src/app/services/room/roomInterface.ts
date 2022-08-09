export interface Room {
    _id?: string;
    bookId?: string;
    roomNumber: Number;
    roomType: string;
    isAccessible: string;
    maxOccupancy: 2,
    building: string;
    floor: string;
    pictureUrls: string;
    pricePerNigh?: number;
}