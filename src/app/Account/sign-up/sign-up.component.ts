import { Component, OnInit } from '@angular/core';
import { Validators , FormControl , FormGroup, FormControlName } from '@angular/forms';

import {AccountService} from '../../Shared/account.service'
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReferalService } from 'src/app/Shared/Referal/referal.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private http : AccountService , private toaster : ToastrService, private route : Router ,
    private referal :  ReferalService
    ) { }

  ngOnInit(): void {

  }

  registerForm = new FormGroup({
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('' , Validators.required),
    email : new FormControl('' ,[Validators.required , Validators.email]),
    password : new FormControl('' , [Validators.required , Validators.minLength(8)]),
    confirmPassword : new FormControl('',Validators.required),
    referalCode : new FormControl(null , Validators.maxLength(6))
  });

   isPasswordAndConfirmPasswordMatch : boolean = false;
  
  comparePassword(password , confirmPassword){
    if(password === confirmPassword){
      this.isPasswordAndConfirmPasswordMatch = true;
    }
    else{
      this.isPasswordAndConfirmPasswordMatch = false;
    }
  } 
   register(){
     if(this.isPasswordAndConfirmPasswordMatch == false){
      this.toaster.error('Password and confirm password doesnt match','Invalid');
     }
     else{
      this.http.register(this.registerForm.value).subscribe(()=>{
        this.http.addReferalCode(this.registerForm.get('email').value).subscribe();
        this.referal.addReferal(this.registerForm.get('email').value , this.registerForm.get('referalCode').value).subscribe();
        this.registerForm.reset();
        this.toaster.success('Succesfully Registered','Success');
      },(err)=>{
        this.toaster.error( '!!!','Invalid');
      });
     }
  }

  loginForm = new FormGroup({
    email : new FormControl('',Validators.required),
    password : new FormControl('', Validators.required)
  })
  login(){
    this.http.login(this.loginForm.get('email').value,this.loginForm.get('password').value).subscribe((data :any)=>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('username', data.userName);
      
      this.toaster.success('Login successfull' , 'Success')
      this.route.navigate(['/Dashboard']);
    },(err : HttpErrorResponse)=>{
      this.toaster.error('The email or password is incorrect.' , 'Login Failed');
    });
  }
}
