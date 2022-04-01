import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InvestmentServiceService {

  constructor(private http : HttpClient) { }


  rootUrl = environment.rootUrl;
  authHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});

  getAllInvestment(){
    return this.http.get(this.rootUrl+'/api/Investment?username='+localStorage.getItem('username'),{headers:this.authHeader});
  }
}
