import { Component } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {
  name = ""
  email = ""
  dob = ""
  counter = 0
  get condition(): boolean {
    return !this.name && !this.email && !this.dob;
  }
  //i want to set the condition to true if all fields are empty
  constructor () {
    // if (!this.name && !this.email && !this.dob){
    //   this.condition = true
    // }

  }
  onReset(){
    this.name = "";
    this.email = "";
    this.dob = "";
  }
  
  onSave(){
    console.log("name: " + this.name)
    console.log("email: " + this.email)
    console.log("dob: " + this.dob)
    this.counter += 1
    console.log("save times: " + this.counter)
  }
}
