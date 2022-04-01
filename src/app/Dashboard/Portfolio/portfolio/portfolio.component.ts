import { Component, OnInit } from '@angular/core';
import { PortfolioInfoService } from 'src/app/Shared/Portfolio/portfolio-info.service';
import { ReferalService } from 'src/app/Shared/Referal/referal.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private http : PortfolioInfoService , private referal : ReferalService) { }

  userPortfolio : any = '';
  referalData : any ='';
  referedBy : string ;
  ngOnInit(): void {
  this.http.getPortfolio().subscribe((response)=>{
    this.userPortfolio = response;
    this.referal.getReferal().subscribe((data) => {
      this.referalData = data;
      this.referedBy = this.referalData.referedBy;
      
      if(this.userPortfolio.currentBalance >=1000 && this.referalData.isRefralCredited==false){
        this.referal.updateReferedByPortfolio(this.referedBy).subscribe();
      }
    });

  })
  }

}
