import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReferalService {

  rootUrl = environment.rootUrl;
  authHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});
  constructor(private http : HttpClient) { }



  addReferal(userName , referalCode){
    const body : any={
      username : userName,
      referedBy : referalCode
    }

   return this.http.post(this.rootUrl+'/api/refralDetail' , body);
  }


  getReferal(){
    return this.http.get(this.rootUrl + '/api/refralDetail?username='+localStorage.getItem('username'));
  }

  updateReferedByPortfolio(referedByCode){
   return this.http.put(this.rootUrl + '/api/refralDetail?username='+localStorage.getItem('username'),referedByCode , {headers : this.authHeader});
  }
}
