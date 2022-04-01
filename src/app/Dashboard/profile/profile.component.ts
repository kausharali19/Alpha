
import { Component, Input, OnInit } from '@angular/core';
import { ProfileDataService } from 'src/app/Shared/ProfileDetail/profile-data.service';
import { ProfileModel } from './profile-model';
import {FormGroup , FormControl, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BankDataServiceService } from 'src/app/Shared/BankDetail/bank-data-service.service';
import { BankData } from '../bank-details/bank-data';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private http : ProfileDataService , private toaster : ToastrService , private bank : BankDataServiceService) { }

  logedInUser : any = '';
  referalCode : any ='';
  bankData : any;
  profileForm = new FormGroup({
    Email : new FormControl(localStorage.getItem('username')),
    First_Name : new FormControl('',Validators.required),
    Last_Name : new FormControl('',Validators.required),
    PhoneNumber : new FormControl(''),
    Address : new FormControl('')
  });

  profileData : ProfileModel={
    Email: '',
    First_Name: '',
    Last_Name: '',
    PhoneNumber: '',
    Address: ''
  };

  profileImageData:any = 'DefaultProfilePic.jpg' ;
  async ngOnInit(): Promise<void> {
    this.logedInUser = await this.http.getLogedInUser().toPromise();
    this.profileData = this.logedInUser; 
  
    this.profileForm = new FormGroup({     
      First_Name : new FormControl(this.profileData.First_Name),
      Last_Name : new FormControl(this.profileData.Last_Name),
      PhoneNumber : new FormControl(this.profileData.PhoneNumber),
      Address : new FormControl(this.profileData.Address),
    });


    this.http.getReferalCode().subscribe((data)=>{
      this.referalCode = data;
    })

    this.bank.getBankDetailBasedOnUserName(localStorage.getItem('username')).subscribe((data)=>{
      this.bankData = data;
    });

    this.http.getProfilePic().subscribe((response)=>{
      this.profileImageData = response;
    })
  }


   saveProfile(){
    this.http.saveProfile(this.profileForm.value).subscribe((response)=>{
      this.logedInUser = response;
      this.profileData.Email = this.logedInUser.Email;
      this.profileData.First_Name = this.logedInUser.First_Name;
      this.profileData.Last_Name = this.logedInUser.Last_Name;
      this.profileData.PhoneNumber = this.logedInUser.PhoneNumber;
      this.profileData.Address = this.logedInUser.Address;
      
      this.profileForm  = new FormGroup({
      First_Name : new FormControl(this.profileData.First_Name),
      Last_Name : new FormControl(this.profileData.Last_Name),
      PhoneNumber : new FormControl(this.profileData.PhoneNumber),
      Address : new FormControl(this.profileData.Address)
      })

      this.toaster.success('Saved Successfully' , 'Success');
    },(err :any)=>{
      this.toaster.error('Something went wrong' , 'Error');
    })
  }

  profileImage : File = null;
  addProfile(event){
    this.profileImage=<File>event.target.files[0];
    this.http.saveProfileImage(this.profileImage).subscribe((response)=>{
      this.toaster.success('Successfully Updated' , 'Success');
      this.profileImageData = response;
    },(err)=>{
      console.log(err)
      this.toaster.error('Something Went Wrong' , 'Error');
    })
  }


}
