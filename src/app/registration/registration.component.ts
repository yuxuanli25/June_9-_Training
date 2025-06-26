import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  
  contactMethods = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setupConditionalValidation();
  }

  createForm(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: [''],
      preferredContactMethod: ['email', [Validators.required]]
    }, {
      validators: [this.passwordMatchValidator]
    });
  }

  setupConditionalValidation(): void {
    // Watch for changes in preferred contact method
    this.registrationForm.get('preferredContactMethod')?.valueChanges.subscribe(value => {
      const phoneControl = this.registrationForm.get('phoneNumber');
      const emailControl = this.registrationForm.get('email');

      if (value === 'phone') {
        // If phone is selected, phone becomes required and email becomes optional
        phoneControl?.setValidators([Validators.required, Validators.pattern(/^\d{10,}$/)]);
        emailControl?.setValidators([Validators.email]); // Remove required for email
      } else {
        // If email is selected, email is required and phone is optional
        phoneControl?.clearValidators();
        emailControl?.setValidators([Validators.required, Validators.email]);
      }

      phoneControl?.updateValueAndValidity();
      emailControl?.updateValueAndValidity();
    });
  }

  // Custom validator for password matching
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Helper methods to check field validation states
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);
    
    if (field && field.errors && (field.dirty || field.touched)) {
      const errors = field.errors;
      
      if (errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
      if (errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${errors['minlength'].requiredLength} characters`;
      if (errors['email']) return 'Please enter a valid email address';
      if (errors['pattern']) return 'Please enter a valid phone number (10+ digits)';
    }
    
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      phoneNumber: 'Phone Number',
      preferredContactMethod: 'Preferred Contact Method'
    };
    return labels[fieldName] || fieldName;
  }

  // Check if form has password mismatch error
  hasPasswordMismatch(): boolean {
    return !!(this.registrationForm.errors?.['passwordMismatch'] && 
             this.registrationForm.get('confirmPassword')?.touched);
  }

  // Check if phone is required based on contact method
  isPhoneRequired(): boolean {
    return this.registrationForm.get('preferredContactMethod')?.value === 'phone';
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          alert('Registration successful!');
        },
        error: (error) => {
          console.error('Registration error:', error);
          alert('Registration failed!');
        }
      });
    } else {
      console.log('Form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.registrationForm.controls).forEach(key => {
      this.registrationForm.get(key)?.markAsTouched();
    });
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.registrationForm.get('preferredContactMethod')?.setValue('email');
  }
}
