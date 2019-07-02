import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Match } from './models/match.model';
import { Bet } from './models/bet.model';

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

    return this.db.list<Match>('/games/' + newDateID + '/matches/').valueChanges();
  
    //return this.db.list('/games/').valueChanges();
  }

  saveBetPlacedUsers(bet : Bet){
    let id = this.datePipe.transform(bet.matchDate,"dd-MM-yyyy").split('-').join(''); 
    let gamesRef = this.db.list<Bet>('/bet/' + id + '/' + bet.matchId);
    let matchId = this.db.createPushId();
    bet.id = matchId;
    return gamesRef.push(bet);
  }
  updateMatch(match : Match) {
    let id = this.datePipe.transform(match.date,"dd-MM-yyyy").split('-').join(''); 
    this.db.object<Match>('/games/' + id + '/matches/' + match.id).update(match);    
  }

  createMatch(match: Match) {
    let id = this.datePipe.transform(match.date,"dd-MM-yyyy").split('-').join(''); 
    let matchId = this.db.createPushId();
    match.id = matchId;
    let gamesRef = this.db.list<Match>('/games/' + id + '/matches/');
    return gamesRef.push(match);    
  }
}
