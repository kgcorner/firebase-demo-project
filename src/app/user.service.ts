import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { switchMap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db : AngularFireDatabase
  ) { }

  save(user : firebase.User){
    if(this.isAlreadyInDataBase(user)){
      if(user.email === 'sudipcold@gmail.com'){
        this.db.object('/user/' + user.uid).update({
          name: user.displayName,
          email:user.email,
          isAdmin : true,
          points : 200
        });
      }else{
        this.db.object('/user/' + user.uid).update({
          name: user.displayName,
          email:user.email,
          isAdmin : false,
          points : 200
        });
      }
    }else{
      if(user.email === 'sudipcold@gmail.com'){
        this.db.object('/user/' + user.uid).update({
          name: user.displayName,
          email:user.email,
          isAdmin : true
        });
      }else{
        this.db.object('/user/' + user.uid).update({
          name: user.displayName,
          email:user.email,
          isAdmin : false
        });
      }
    }
  }

  get(uid : string) : AngularFireObject<AppUser>{
    return this.db.object('/user/' + uid);
  }

  isAlreadyInDataBase(user : firebase.User): Observable<boolean>{
    return this.get(user.uid).valueChanges().pipe(
      map(user =>{
        if(user)
          return true;
        return false;
      })
    )
  }
}
