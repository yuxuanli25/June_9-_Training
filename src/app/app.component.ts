import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'antra_train_1';

  constructor(
    public userService: UserService,
    private http: HttpClient
  ) {}

  logout(): void {
    this.userService.logout();
    alert('You have been logged out successfully!');
  }

  testProtectedRoute(): void {
    this.http.get('http://localhost:3000/user/profile').subscribe({
      next: (response) => {
        console.log('Protected route response:', response);
        alert('Protected route accessed successfully! Check console for details.');
      },
      error: (error) => {
        console.error('Protected route error:', error);
        alert(`Protected route failed: ${error.status} - ${error.message}`);
      }
    });
  }

  testAdminRoute(): void {
    this.http.get('http://localhost:3000/admin/users').subscribe({
      next: (response) => {
        console.log('Admin route response:', response);
        alert('Admin route accessed successfully! Check console for details.');
      },
      error: (error) => {
        console.error('Admin route error:', error);
        if (error.status === 403) {
          alert('Access denied: You need admin privileges to access this route.');
        } else {
          alert(`Admin route failed: ${error.status} - ${error.message}`);
        }
      }
    });
  }
}
