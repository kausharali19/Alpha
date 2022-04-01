import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import{BankDataServiceService} from'../../Shared/BankDetail/bank-data-service.service';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit , OnDestroy {

  constructor(private http : BankDataServiceService , private toaster : ToastrService ) { }


  isBankAdded = false;
  foundBankAccount : any ='';
  getBankDetailBasedOnUserNameSubscribe : Subscription;
  ngOnInit(): void {
    this.getBankDetailBasedOnUserNameSubscribe = this.http.getBankDetailBasedOnUserName(localStorage.getItem('username')).subscribe((response)=>{
      this.foundBankAccount = response;
      if(this.foundBankAccount != null){
        this.isBankAdded = true;
      }
      else{
        this.isBankAdded = false;
      }
    })
  }

  bankData = new FormGroup({
     userName : new FormControl(localStorage.getItem('username')),
     bankHolderName : new FormControl('' , Validators.required),
     bankAccountNumber : new FormControl('', [Validators.required]),
     bankIfsc : new FormControl('', [Validators.required , Validators.maxLength(11) , Validators.minLength(11)]),
     bankName : new FormControl('' , Validators.required )
  })

    addBankData(){
     if(this.bankData.invalid){
      this.toaster.error('Invalid Inputs' ,'Error');
     }
     else{
      this.http.addBankDetails(this.bankData.value).subscribe( (response)=>{
        this.toaster.success('Succesfully Added' , 'success')
        
        this.http.getBankDetailBasedOnUserName(localStorage.getItem('username')).subscribe((data)=>{
          this.foundBankAccount = data;
          this.isBankAdded = true;
        })

      },(err)=>{
        this.toaster.error('Invalid Input');
      });
     }
     
  }


  deleteAccount(){
      this.http.deleteAccount(localStorage.getItem('username')).subscribe(()=>{
        this.toaster.success('Deleted Successfully' , 'Success');
        this.isBankAdded = false;
      },(err) =>{
        this.toaster.error('Deletion Failed' , 'Error'),
        this.isBankAdded = true;
      })
  }


  ngOnDestroy(): void {
    this.getBankDetailBasedOnUserNameSubscribe.unsubscribe();
  }

}
