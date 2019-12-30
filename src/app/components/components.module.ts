import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [NavbarComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
     NavbarComponent,
     LoginComponent]
})
export class ComponentsModule { }
