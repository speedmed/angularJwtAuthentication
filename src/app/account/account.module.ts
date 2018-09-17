import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [LoginComponent, ProfileComponent, AccountComponent]
})
export class AccountModule { }
