import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileModel } from 'src/app/Dashboard/profile/profile-model';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  rootUrl = environment.rootUrl;
  authHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});
  constructor(private http : HttpClient) { }

  getLogedInUser(){
    return this.http.get(this.rootUrl+'/api/Account/getLogedInUser?username='+localStorage.getItem('username') , {headers : this.authHeader});
  }

  saveProfile(data : any){
    const body : ProfileModel={
      Email: data.Email,
      First_Name: data.First_Name,
      Last_Name: data.Last_Name,
      PhoneNumber: data.PhoneNumber,
      Address: data.Address
    }
    return this.http.put(this.rootUrl+'/api/Account/saveProfile?username='+localStorage.getItem('username'),body , {headers : this.authHeader});
  }

  getProfilePic(){
    return this.http.get(this.rootUrl+'/api/profileImage?username='+localStorage.getItem('username') , {headers : this.authHeader});
  }

  saveProfileImage(profilePic:File){
    const formData : FormData = new FormData();

    formData.append('ProfilePic',profilePic ,profilePic.name);
    return this.http.put(this.rootUrl +'/api/profileImage?username='+localStorage.getItem('username'),formData , {headers : this.authHeader});
  }


  getReferalCode(){
    return this.http.get(this.rootUrl+'/api/newUserReferalCode?username='+localStorage.getItem('username') , {headers : this.authHeader});
  }
}
