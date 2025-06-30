import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'auth_token';
  private userKey = 'user_info';
  
  // BehaviorSubject to track authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    console.log('Sending registration data:', userData);
    console.log('Registration data as JSON:', JSON.stringify(userData));
    return this.http.post(`${this.baseUrl}/user/register`, userData);
  }

  loginUser(loginData: any): Observable<any> {
    console.log('Sending login data:', loginData);
    console.log('Login data as JSON:', JSON.stringify(loginData));
    return this.http.post(`${this.baseUrl}/user/login`, loginData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setToken(response.token);
          this.setUserInfo(response.user);
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUserInfo(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  private getCurrentUserFromStorage(): any {
    const userInfo = localStorage.getItem(this.userKey);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}
