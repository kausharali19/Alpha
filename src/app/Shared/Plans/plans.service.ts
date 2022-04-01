import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private http : HttpClient) { }
  rootUrl = environment.rootUrl;
  authHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});
  getAllPlans(){
    return this.http.get(this.rootUrl+'/api/AlphaPlan' , {headers : this.authHeader});
  }

  getSelectedPlan(planId : number){
    return this.http.get(this.rootUrl+'/api/AlphaPlan/'+planId , {headers : this.authHeader});
  }
}
