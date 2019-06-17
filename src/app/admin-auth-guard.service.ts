import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMapTo, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {


  id : any;
  user : any;

  constructor(
    private auth : AuthService,
    private userService : UserService) {
    }

  canActivate(): Observable<boolean> {

    return this.auth.user$.
    pipe(
      switchMap(user => this.userService.get(user.uid))
    ).pipe(
      map((appUser:AppUser) => appUser.isAdmin)
    );

    // canActivate(): Observable<boolean> {
    //   return this.auth.user$
    //   .switchMap(user => this.userService.get(user.uid))
    //   .map((appUser :any) => appUser.isAdmin);
    //  }
    // return of(true);
  }


}
 