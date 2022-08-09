import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './userInterface';
import { Users } from './usersInterface';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userState$ = new BehaviorSubject<{ token: string }>({ token: '' });

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/users/login`, { email, password });
  }

  logout() {
    this.userState$.next({ token: '' });
    localStorage.clear();
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  getUserState(): User | null {
    const decoded = this.userState$.value.token && jwt_decode(this.userState$.value.token) as User;
    return decoded || null;
  }

  persistState() {
    localStorage.setItem('userState', JSON.stringify(this.userState$.value));
  }

  refreshState() {
    const userState = localStorage.getItem('userState');
    if (userState) {
      this.userState$.next(JSON.parse(userState));
    }
  }

  getAllUsers(): any {
    return this.http.get<any>(`${environment.apiUrl}/users`); 
  }

  getUserById(user_id?: string): any {
    return this.http.get<any>(`${environment.apiUrl}/users/${user_id}`);
  }

  addUser(user: Users) {
    return this.http.post<any>(`${environment.apiUrl}/users`, user);
  }

  updateUser(user: Users, user_id?: string): any {
    return this.http.put(`${environment.apiUrl}/users/${user_id}`, user);
  }

  deleteUser(user_id?: string): any {
    return this.http.delete<any>(`${environment.apiUrl}/users/${user_id}`);
  }

}
