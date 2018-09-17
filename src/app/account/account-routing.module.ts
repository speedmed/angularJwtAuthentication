// src/app/security/guards/auth.guard.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from '../security/guards/auth.guard';

const routes: Routes = [{
  path: 'account', component: AccountComponent, children: [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
