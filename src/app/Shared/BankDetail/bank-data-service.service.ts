import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankData } from 'src/app/Dashboard/bank-details/bank-data';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankDataServiceService {

  constructor(private http : HttpClient) { }

  rootUrl = environment.rootUrl;
  
  authHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});
  addBankDetails(data: BankData){
    const body : BankData={
      userName :data.userName,
      bankHolderName: data.bankHolderName,
      bankAccountNumber: data.bankAccountNumber,
      bankIfsc: data.bankIfsc,
      bankName: data.bankName
    }
    return this.http.post(this.rootUrl+'/api/bankDetail',body , {headers : this.authHeader});
  }

  getBankDetailBasedOnUserName(userName : string){
     
   return this.http.get(this.rootUrl+'/api/bankDetail?userName='+userName , {headers : this.authHeader});
  }

  deleteAccount(userName){
    
    return this.http.delete(this.rootUrl+'/api/bankDetail?userName='+userName , {headers : this.authHeader})
  }
}
