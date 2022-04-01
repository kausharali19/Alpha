import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../Account/sign-up/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }


  rootUrl ="https://localhost:44325";
  register(user : User){

    const body: User={
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      password: user.password,
      confirmPassword :user.confirmPassword
    }
    return this.http.post(this.rootUrl+"/api/Account/Register" , body );
  }
  addReferalCode(email){
    const body : any ={
      username : email
    }
    return this.http.post(this.rootUrl+'/api/newUserReferalCode' ,body );
  }
  login(username , password){
    var credential = "username="+username+"&password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    return this.http.post(this.rootUrl+'/token',credential,{headers: reqHeader});
  }


  changePassword(OldPassword , NewPassword){
    const body : any ={
      Email : localStorage.getItem('username'),
      OldPassword : OldPassword,
      NewPassword : NewPassword
    }
    return this.http.post(this.rootUrl + '/api/Account/ChangePassword',body)
  }
    
}
