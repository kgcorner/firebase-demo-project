import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private db : AngularFireDatabase,
    private datePipe: DatePipe
  ) { }

  getMatches(){
    let today = Date.now();
    let date = this.datePipe.transform(today,"dd-MM-yyyy").split('-').join(''); 
    let newDateID = Number(date);

    return this.db.list('/games/' + newDateID + '/matches/').valueChanges();
  
    //return this.db.list('/games/').valueChanges();
  }

  saveBetPlacedUsers(teamSelected : string){
    //console.log(teamSelected +"  "+ localStorage.getItem('currentUserId'));
    this.db.list('/games/matches')
  }
}
