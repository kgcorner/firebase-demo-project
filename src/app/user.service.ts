import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { switchMap, map, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db : AngularFireDatabase
  ) { }

  save(user : firebase.User){

    if(user.email === 'sudipcold@gmail.com' || user.email === 'kumargauravgupta3@gmail.com'){
      this.db.object('/user/' + user.uid).update({
        name: user.displayName,
        email:user.email,
        isAdmin : true,
        points : 1000
      });
    }else{
      this.db.object('/user/' + user.uid).update({
        name: user.displayName,
        email:user.email,
        isAdmin : false,
        points : 1000
      });
    }
  }

  updateUser(user) {
    this.db.object('/user/' + user.uid).update(user);
  }

  saveWithOutPoints(user : firebase.User){

    if(user.email === 'sudipcold@gmail.com'|| user.email === 'kumargauravgupta3@gmail.com'){
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

  get(uid : string) : AngularFireObject<AppUser>{
    return this.db.object<AppUser>('/user/' + uid);
  }

  getUser(uid : string) : Observable<AppUser>{
    return this.db.object<AppUser>('/user/' + uid).valueChanges();
  }

  getAllPoints(){
    this.db.list('/user/').valueChanges().subscribe((users : AppUser[]) =>{
      let list : any[];
      for(let i = 0; i < users.length; i++){
        this.db.object('/points/' + (i+1)).update({
          userName: users[i].name,
          userPoints: users[i].points  
        })
        //console.log(users[i].name);
        //console.log(users[i].points);
      }
    });
  }

}
