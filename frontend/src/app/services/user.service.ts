import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './userInterface';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userState$ = new BehaviorSubject<{ token: string }>({ token: '' });

  constructor(private http: HttpClient) { }
  
  baseUrl="http://localhost:3000/api/v1";

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/users/login`, { email, password });
  }
  
  logout() {
    this.userState$.next({ token: '' });
    localStorage.clear();
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
}
