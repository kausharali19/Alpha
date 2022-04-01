import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { BankDataServiceService } from 'src/app/Shared/BankDetail/bank-data-service.service';
import { PortfolioInfoService } from 'src/app/Shared/Portfolio/portfolio-info.service';
import { TransactionLogServiceService } from 'src/app/Shared/Transaction/transaction-log-service.service';

@Component({
  templateUrl: './withdrawl.component.html',
  styleUrls: ['./withdrawl.component.css']
})
export class WithdrawlComponent implements OnInit {

  constructor(private  bankService : BankDataServiceService , private portfolio : PortfolioInfoService , 
    private toaster : ToastrService, private log : TransactionLogServiceService) { }

  userBankDetails : any ='';
  userPortfolio : any ='';
  userWithdrawlableBalance : any ='' ;
  ngOnInit(): void {
    this.bankService.getBankDetailBasedOnUserName(localStorage.getItem('username')).subscribe((data)=>{
      this.userBankDetails = data;
      
    });


    this.portfolio.getPortfolio().subscribe((data)=>{
      this.userPortfolio = data;
      this.userWithdrawlableBalance = this.userPortfolio.withdrawlableBalance;
    });
  }


  withdrawlForm = new FormGroup({
    amount : new FormControl('', [Validators.required , Validators.min(500)])
  });

  proceed(){
    if(this.withdrawlForm.get('amount').value > this.userWithdrawlableBalance){
      this.toaster.error('Insufficient Balance' , 'OOPS!!');
    }

    else{
      if(this.userBankDetails == null){
        this.toaster.error('No bank Account Added yet!!' , 'OOPS!!')
      }else{
        this.log.addTransaction('Withdrawl' , this.withdrawlForm.get('amount').value,this.userWithdrawlableBalance).subscribe((data)=>{
          this.toaster.warning('Withdrawl can take process upto 6 hours' , 'Pending');
          this.portfolio.getPortfolio().subscribe((data)=>{
            this.userPortfolio = data;
            this.userWithdrawlableBalance = this.userPortfolio.withdrawlableBalance;
  
            this.withdrawlForm.reset();
          })
        });
      }

    }

  }

  insufficientBalance = false;
  isValidAmount(){
    if(this.withdrawlForm.get('amount').value > this.userWithdrawlableBalance){
      this.insufficientBalance = true;

    }
    else{
      this.insufficientBalance = false;
    }
  }
}
