import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PortfolioInfoService {

  constructor(private http : HttpClient) { }

  rootUrl = environment.rootUrl;
  authHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});
  getPortfolio(){
    
    return this.http.get(this.rootUrl +'/api/curentPortfolio?username='+localStorage.getItem('username'), {headers : this.authHeader});
  }

  updatePortfolio(data : number){
    const body : any={
      Amount : data
    }
   return this.http.put(this.rootUrl+'/api/curentPortfolio?username='+localStorage.getItem('username'),body , {headers: this.authHeader})
  }
}
