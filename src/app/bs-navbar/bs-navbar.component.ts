import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  name;
  appUser : AppUser;

  constructor(public auth : AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser)
  }

  logout(){
    this.auth.logout();
  }
}
