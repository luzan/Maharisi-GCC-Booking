import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from './roomInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomState$ = new BehaviorSubject<{ token: string }>({ token: '' });

  constructor(private http: HttpClient) { }

  getRooms(query: string): any {
    return this.http.get<any>(`${environment.apiUrl}/rooms/?${query}`);
  }

  getAllRooms(): any {
    return this.http.get<any>(`${environment.apiUrl}/rooms`);
  }

  getRoomById(room_id?: string): any {
    return this.http.get<any>(`${environment.apiUrl}/rooms/${room_id}`);
  }

  addRoom(room: any) {
    return this.http.post<any>(`${environment.apiUrl}/rooms`, room);
  }

  updateRoomBooking(room: Room, room_id?: string): any {
    return this.http.put(`${environment.apiUrl}/rooms/${room_id}`, room);
  }

}
