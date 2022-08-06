import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.userService.getUserState()) {
      return next.handle(request);
    } else {
      const clone = request.clone({ setHeaders: { Authorization: `Bearer ${this.userService.userState$.value.token}` } });
      return next.handle(clone);
    }
  }
}
