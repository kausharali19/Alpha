import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlansService } from 'src/app/Shared/Plans/plans.service';
import { PortfolioInfoService } from 'src/app/Shared/Portfolio/portfolio-info.service';
import { TransactionLogServiceService } from 'src/app/Shared/Transaction/transaction-log-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http : PlansService , private portfolio : PortfolioInfoService , 
    private toaster : ToastrService , private transaction : TransactionLogServiceService , private router : Router) { }
  userPortfolio : any;
  allPlans : any ='' ;
  ngOnInit(): void {
    this.http.getAllPlans().subscribe((data)=>{
      this.allPlans = data;
     
    });
    this.portfolio.getPortfolio().subscribe((data)=>{
      this.userPortfolio = data;
      this.userPortfolioBalance = this.userPortfolio.currentBalance;
    })
  }
  selectedPlan : any;
  userPortfolioBalance : number ;
  selectedPlanPrice : number;
  addedTransaction : any;
  async invest(planId : any){
    this.selectedPlan =await this.http.getSelectedPlan(planId).toPromise();
    this.selectedPlanPrice = this.selectedPlan.Price;
    if(this.userPortfolioBalance < this.selectedPlanPrice){
      this.toaster.error( 'Kindly Add Balance First', 'insufficient Balance')
    }else{
      if(confirm('Are you sure to Invest??')){
        this.portfolio.updatePortfolio(this.selectedPlanPrice).subscribe();
        
        this.transaction.addTransaction('Investment',this.selectedPlanPrice,planId).subscribe((data)=>{
          this.addedTransaction = data;
        });
        this.toaster.success('Successfully Invested' , 'Success');
        this.router.navigate(['/Dashboard/investment'])
      }
    }
  }
  

}
