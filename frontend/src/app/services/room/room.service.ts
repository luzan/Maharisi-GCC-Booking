import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRooms(query: string): any {
    return this.http.get<any>(`${environment.apiUrl}/rooms/?${query}`);
  }

}
