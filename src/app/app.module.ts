import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Account/sign-up/sign-up.component';
import {AccountService} from './Shared/account.service';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './Dashboard/main/main.component';
import { AuthGuard } from './Auth/auth.guard';
import { SideNavComponent } from './Dashboard/side-nav/side-nav.component';
import { ProfileComponent } from './Dashboard/profile/profile.component';
import { HomeComponent } from './Dashboard/home/home.component';
import { BankDetailsComponent } from './Dashboard/bank-details/bank-details.component';
import { BankDataServiceService } from './Shared/BankDetail/bank-data-service.service';
import { ProfileDataService } from './Shared/ProfileDetail/profile-data.service';
import { PortfolioComponent } from './Dashboard/Portfolio/portfolio/portfolio.component';
import { PortfolioInfoService } from './Shared/Portfolio/portfolio-info.service';
import { TransactionComponent } from './Dashboard/Transaction/transaction/transaction.component';
import { PlansService } from './Shared/Plans/plans.service';
import { TransactionLogServiceService } from './Shared/Transaction/transaction-log-service.service';
import { DepositeComponent } from './Dashboard/Deposite/deposite/deposite.component';
import { DepositeServiceService } from './Shared/Deposite/deposite-service.service';
import { WithdrawlComponent } from './Dashboard/Withdrawl/withdrawl/withdrawl.component';
import { ReferalService } from './Shared/Referal/referal.service';
import { InvestmentComponent } from './Dashboard/Investment/investment/investment.component';
import { InvestmentServiceService } from './Shared/Investment/investment-service.service';
import { FooterComponent } from './Dashboard/Footer/footer/footer.component';
import { ChangePasswordComponent } from './Dashboard/ChangePassword/change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    MainComponent,
    SideNavComponent,
    ProfileComponent,
    HomeComponent,
    BankDetailsComponent,
    PortfolioComponent,
    TransactionComponent,
    DepositeComponent,
    WithdrawlComponent,
    InvestmentComponent,
    FooterComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, HttpClientModule , ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule

    
  ],
  providers: [AccountService,AuthGuard,BankDataServiceService,ProfileDataService,PortfolioInfoService,
  PlansService,TransactionLogServiceService,DepositeServiceService , ReferalService,InvestmentServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
