import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
     private auth : AuthService,
     private userService : UserService,
     router : Router){

     auth.user$.subscribe(user =>{
       if(user){
         localStorage.setItem('currentUserId',user.uid);
         userService.get(user.uid).valueChanges().subscribe(u=>{
           if(u !== null){
             userService.saveWithOutPoints(user);
           }else{
             userService.save(user);
           }
         })
       }
     })

    let returnUrl = localStorage.getItem('returnUrl');
    router.navigateByUrl(returnUrl);
    this.userService.getAllPoints();
  }
}


