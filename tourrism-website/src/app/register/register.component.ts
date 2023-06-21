import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../register/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  registerForm: UntypedFormGroup;
  registered : boolean = false;

  constructor(private fb: UntypedFormBuilder, private registerService: RegisterService, private router: Router) { }
  

  ngOnInit() {
    window.scrollTo(0, 0)
    //form is created on page load
    this.registerForm = this.fb.group({
      name: ['',[Validators.required , Validators.pattern('^[A-Za-z]{1,}[ ][A-Za-z]{1,}$')]],
      emailId: ['',[Validators.required , Validators.pattern('^[a-z0-9]{1,}@[a-z]{1,}(\.com)$')]],
      contactNo: ['', [ Validators.required,Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{7,20}$')]]
      })
  }

  register(){
    this.registerForm.value;
    this.registerService.register(this.registerForm.value).subscribe(
      (success) => {
        this.successMessage="Registered successfully!!!"
        this.registered=true;
      },
      (error) =>{
        this.errorMessage=error.error.message;
      })
  }
  login(){
    this.router.navigate(['/login']);
  }
}
//   function validateEmail(input : FormControl){
//   const ivalue=input.value;
//   return ivalue.match(/^[a-z0-9]{1,}@[a-z]{1,}(\.com)$/) ? null : {
//     emailIdError : { message : "Enter a valid emailId"}
//   }
// }
  

// function validateName(input : FormControl){
//     const ivalue=input.value;
//     return ivalue.match(/^[a-zA-Z]{1,}[ ]?[a-zA-Z]{1,}$/) ? null : {
//       emailIdError : { message : "Enter a valid name format"}
//     }
//     }
// function validatePassword(input : FormControl){
//     const ivalue=input.value;
//     return ivalue.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{7,20}$/) ? null : {
//       emailIdError : { message : "Enter a valid password format"}
//   }
// }