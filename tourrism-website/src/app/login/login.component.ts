import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: UntypedFormGroup;
  registerPage=false;

  constructor(private location: Location,private fb: UntypedFormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    //form is created on page load
    this.loginForm = this.fb.group({
      contactNo: ['', [ Validators.required,Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required]]
      })
  }

  
  login() {
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
          this.errorMessage = null;
          //userdatils are stored in the sessionStorage
          sessionStorage.setItem("contactNo", response.contactNo);
          sessionStorage.setItem("userId", response.userId);
          sessionStorage.setItem("userName",response.name);
          // var userId=response.userId;
          // window.location.reload();
          //user should be navigated to home page on successful login
          this.router.navigate(['/home', response.userId]);
          
      },
      (errorResponse) => {
        //error message if invalid contact number or password
          this.errorMessage = errorResponse.error.message;
          //clears the session storage when there is any error during login
          sessionStorage.clear();
      }
    );

}
  getRegisterPage(){
    this.registerPage=true;
    //open register page if the user is not registered already
    this.router.navigateByUrl('/register');
  }
}





