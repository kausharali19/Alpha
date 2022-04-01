import { Component, OnInit } from '@angular/core';
import { TransactionLogServiceService } from 'src/app/Shared/Transaction/transaction-log-service.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private http : TransactionLogServiceService) { }

  transactionLog : any ='';
  ngOnInit(): void {

    this.http.getTransaction().subscribe((data)=>{
      this.transactionLog = data;
      
    })
  }

}
