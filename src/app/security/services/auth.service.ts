// src/app/security/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {

  private baseUrl: string = 'http://localhost:9090/api/';
  private loginUrl: string = this.baseUrl + 'open/login';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set('Accept', 'application/json');
  }

  login(username: string, password: string): Observable<boolean> {

    return this.http.post(this.loginUrl, {username: username, password: password}, {headers: this.headers, observe: 'response'})
      .pipe(
        map((response: HttpResponse<any>) => {
            // login successful if there's a jwt token in the response
            let token = response.body.token;
            let refreshToken = response.body.refreshToken;

            if (token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('loggedUser', JSON.stringify({ username: username, token: token, refreshToken: refreshToken }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('loggedUser');
  }

  getToken(): string {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    let token = loggedUser && loggedUser.token;
    return token ? token : "";
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired or not
    // return true or false
    return token != "" ? !jwtHelper.isTokenExpired(token) : false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(error);
  }
}
