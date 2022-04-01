import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Shared/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private http : AccountService , private toaster : ToastrService , private router : Router) { }


  ngOnInit(): void {
  }

  changePasswordForm = new FormGroup({
    OldPassword : new FormControl('' , Validators.required),
    NewPassword : new FormControl('' , Validators.required),
    ConfirmPassword : new FormControl('' , Validators.required)
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


  changePassword(){
    if(this.isPasswordAndConfirmPasswordMatch == false){
      this.toaster.error('Password and confirm password doesnt match','Invalid');
    }
     else{
      this.http.changePassword(this.changePasswordForm.get('OldPassword').value , this.changePasswordForm.get('NewPassword').value)
      .subscribe((response)=>{
        this.toaster.success('Password is successfully Changed' , "Success");
        this.router.navigate(['../'])
      },(err)=>{
        this.toaster.error(err.error.Message , "Retry!!")
      })
     }
  }
}
