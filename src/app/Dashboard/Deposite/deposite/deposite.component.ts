import { Component, OnInit } from '@angular/core';
import{FormGroup , FormControl, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { TransactionLogServiceService } from 'src/app/Shared/Transaction/transaction-log-service.service';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent implements OnInit {

  constructor(private http : TransactionLogServiceService , private toaster : ToastrService) { }

  ngOnInit(): void {
  }
 
  isMinAmount = false;
  minAmountCheck(amount){
    if(amount>=1000){
      this.isMinAmount = true;
    }
    else{
      this.isMinAmount=false;
    }
  }

  depositeForm = new FormGroup({
    depositeAmount : new FormControl('', [Validators.required , Validators.min(1000)]),
    transactionId : new FormControl('', Validators.required),
  
  });

  

  pay(){
    this.http.addTransaction('Deposite',this.depositeForm.get('depositeAmount').value,this.depositeForm.get('transactionId').value)
    .subscribe((data)=>{
      this.toaster.warning('Verification is under Process','Pending');   
    })
  }
  
}
