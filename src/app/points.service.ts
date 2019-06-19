import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor( private db : AngularFireDatabase ) { }


  getAllPoints(){
    return this.db.list('/points/').valueChanges();
  }


}
