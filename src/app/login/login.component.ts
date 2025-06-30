import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  // Helper methods to check field validation states
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    if (field && field.errors && (field.dirty || field.touched)) {
      const errors = field.errors;
      
      if (errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
      if (errors['email']) return 'Please enter a valid email address';
      if (errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Password'
    };
    return labels[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const loginData = this.loginForm.value;
      
      this.userService.loginUser(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          alert(`Welcome back, ${response.user.username}! You are now logged in.`);
          this.isLoading = false;
          this.resetForm();
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          
          if (error.status === 401) {
            alert('Invalid email or password. Please try again.');
          } else if (error.status === 0) {
            alert('Cannot connect to server. Please check if the backend is running.');
          } else if (error.error && error.error.message) {
            alert(`Login failed: ${error.error.message}`);
          } else {
            alert(`Login failed! Error: ${error.status} - ${error.message}`);
          }
        }
      });
      
    } else {
      console.log('Login form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  resetForm(): void {
    this.loginForm.reset();
    this.loginForm.get('rememberMe')?.setValue(false);
  }
}
