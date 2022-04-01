import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransactionLogServiceService {

  constructor(private http : HttpClient) { }

  rootUrl = environment.rootUrl;
  authHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});
  addTransaction(tType : string  , tAmount : number , tId : string){
    const body : any= {
      transactionType : tType,
      transactionAmount : tAmount,
      username : localStorage.getItem('username'),
      transactionId : tId
    }

    return this.http.post(this.rootUrl+'/api/transaction',body , {headers : this.authHeader});
  }

  getTransaction(){
    return this.http.get(this.rootUrl+'/api/transaction?username='+localStorage.getItem('username') , {headers : this.authHeader});
  }
}
