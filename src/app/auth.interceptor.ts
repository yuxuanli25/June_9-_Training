import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service
    const authToken = this.userService.getToken();
    
    // Check if this is a request that needs authentication
    // Skip adding token for login and register endpoints
    const skipAuth = request.url.includes('/user/login') || 
                     request.url.includes('/user/register');
    
    // If we have a token and this isn't a skip-auth endpoint, add the Authorization header
    if (authToken && !skipAuth) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authRequest);
    }
    
    // Otherwise, send the original request
    return next.handle(request);
  }
}
