import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {
  counter = 0;
  
  // Create FormGroup with FormControls
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl('')
  });
  
  // Dynamic getter that checks if all fields are empty
  get condition(): boolean {
    const formValues = this.userForm.value;
    return !formValues.name && !formValues.email && !formValues.dob;
  }

  // Getters for easy access to form values in template
  get name(): string {
    return this.userForm.get('name')?.value || '';
  }

  get email(): string {
    return this.userForm.get('email')?.value || '';
  }

  get dob(): string {
    return this.userForm.get('dob')?.value || '';
  }
  
  constructor () {
    // No need to set condition here anymore since it's now a getter
  }
  
  onReset(){
    this.userForm.reset();
  }
  
  onSave(){
    const formValues = this.userForm.value;
    console.log("name: " + formValues.name)
    console.log("email: " + formValues.email)
    console.log("dob: " + formValues.dob)
    this.counter += 1
    console.log("save times: " + this.counter)
  }
}
