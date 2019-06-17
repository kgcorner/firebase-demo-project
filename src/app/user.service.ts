import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db : AngularFireDatabase
  ) { }

  save(user : firebase.User){
    this.db.object('/user/' + user.uid).update({
      name: user.displayName,
      email:user.email,
      isAdmin : false
    });
  }

  get(uid : string) : Observable<any>{
    return this.db.object('/user/' + uid).valueChanges();
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }
}
