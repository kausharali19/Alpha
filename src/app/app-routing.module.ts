import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './Account/sign-up/sign-up.component';
import { AuthGuard } from './Auth/auth.guard';
import { BankDetailsComponent } from './Dashboard/bank-details/bank-details.component';
import { ChangePasswordComponent } from './Dashboard/ChangePassword/change-password/change-password.component';
import { DepositeComponent } from './Dashboard/Deposite/deposite/deposite.component';
import { HomeComponent } from './Dashboard/home/home.component';
import { InvestmentComponent } from './Dashboard/Investment/investment/investment.component';
import { MainComponent } from './Dashboard/main/main.component';
import { PortfolioComponent } from './Dashboard/Portfolio/portfolio/portfolio.component';
import { ProfileComponent } from './Dashboard/profile/profile.component';
import { TransactionComponent } from './Dashboard/Transaction/transaction/transaction.component';
import { WithdrawlComponent } from './Dashboard/Withdrawl/withdrawl/withdrawl.component';


const routes: Routes = [
  

  {path:'Dashboard', component:MainComponent , canActivate:[AuthGuard],children:[
    {path: '' , component:HomeComponent},
    {path:'profile', component:ProfileComponent},
    {path:'bank' , component:BankDetailsComponent},
    {path:'portfolio' , component:PortfolioComponent},
    {path : 'transactions' , component: TransactionComponent},
    {path:'deposite' , component:DepositeComponent},
    {path : 'withdrawl' ,  component: WithdrawlComponent},
    {path:'investment' , component: InvestmentComponent},
    {path : 'changePassword' , component : ChangePasswordComponent}
  ]},
  {
    path : 'Account' , component:SignUpComponent
  },
  {path:'' , redirectTo:'/Dashboard' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
