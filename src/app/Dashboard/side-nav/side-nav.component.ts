import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileDataService } from 'src/app/Shared/ProfileDetail/profile-data.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private router : Router , private profilePic : ProfileDataService) { }

  logedInUsername : string;
  userProfilePic : any ='';
  Pic : any;
  ngOnInit(): void {
    this.logedInUsername = localStorage.getItem('username');
    this.profilePic.getProfilePic().subscribe((data)=>{
      this.userProfilePic = data;
      this.Pic = this.userProfilePic.profilePicName;
    })
  }
  
  logOut(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    this.router.navigate(['/Account']);
  }
}
