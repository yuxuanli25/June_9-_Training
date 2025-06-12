import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodolistComponent } from '../todolist/todolist.component';
import { HoverbackgroundDirective } from '../todolist/hoverbackground.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    TodolistComponent,
    HoverbackgroundDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
