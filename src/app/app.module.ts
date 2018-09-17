import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';


import { AppComponent } from './app.component';
import { AuthService } from './security/services/auth.service';
import { httpInterceptorProviders } from './security/interceptors';
import { AuthGuard } from './security/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AccountModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, httpInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
