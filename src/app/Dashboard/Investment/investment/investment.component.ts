import { Component, OnInit } from '@angular/core';
import { InvestmentServiceService } from 'src/app/Shared/Investment/investment-service.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent implements OnInit {

  constructor(private http : InvestmentServiceService) { }


  myInvestment : any = null;
  ngOnInit(): void {

    this.http.getAllInvestment().subscribe((data)=> {
      this.myInvestment = data;
    });

  }

}
