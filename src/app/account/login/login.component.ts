import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../security/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { 
    this.createLoginForm();
  }

  ngOnInit() {
    
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      'username': [' ', Validators.required],
      'password': [' ', Validators.required]
    })
  }

  login() {
    let credentials = this.loginForm.value;
    console.log(credentials);
    
    this.authService.login(credentials.username, credentials.password)
    .subscribe(() => {
      this.router.navigate(['account/profile']);
    },
    err => console.log("Error while Authenticating"));
    
  }

}
