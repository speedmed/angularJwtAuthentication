//src/app/security/interceptors/token.interceptor.ts
import { Injectable, Injector } from '@angular/core';
import { Router} from '@angular/router'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../security/services/auth.service';

// we cant inject services from the constructor, because HttpInterceptor doesn't allow to inject a service that use an HttpClient also
// this is why we use Injector to manually inject them 

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authService: AuthService = this.inj.get(AuthService); //authservice is an angular service

    console.log("intercepted request ... ");
    
    const authToken: string = authService.getToken();

    // cloned headers, updated with the authorization header.
    const authReq = req.clone({ setHeaders: {'Authorization': `Bearer ${authToken}`}  });

    // send cloned request with header to the next handler.
    return next.handle(authReq)
    .pipe(
        catchError((error: HttpErrorResponse) => {
            let router = this.inj.get(Router);
            console.log("Interceptor error ... "+ JSON.stringify(error));
            if (error.status === 401) {
                console.log("Interceptor code 401 ... ");
                //logout users, redirect to login page
                authService.logout();
                //redirect to the signin page or show login modal here
                router.navigate(['account/login']); 
                return new ErrorObservable(error);
            }
    
            return new ErrorObservable(error);
                
        })
    );
  }
}
