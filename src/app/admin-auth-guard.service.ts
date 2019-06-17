import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';



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

    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin)
    );
  }

}
 