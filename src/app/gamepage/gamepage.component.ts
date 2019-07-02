import { AuthService } from './../auth.service';
import { FlagIcon } from './../utilites/flagicon';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Bet } from '../models/bet.model';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';
import { UserService } from '../user.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  matches : Observable<Match[]>;
  flags = new FlagIcon().flagList;
  disabledSubmitButton = false;
  error : boolean;
  errorMessage : string;
  matchInAction : string;
  constructor(
    private gameService : GameService,
    private userService : UserService
  ) {
    this.error = false;
  }

  ngOnInit() {
    this.matches = this.gameService.getMatches();
    this.matches.subscribe(m=>console.log(m))
  }

  submit(ngf, match: Match){
    this.matchInAction = match.id;
    let userId = localStorage.getItem('currentUserId');
    this.userService.getUser(userId).subscribe(user => {
      if(match.players && match.players.indexOf(userId) >=0 ) {
        this.error = true;
        this.errorMessage = "You have already bet on this match"
      } else {
        if(user['points'] > 0) {
          let bet = new Bet();    
          let formMatchVal = ngf.value["match"];
          bet.winner  = formMatchVal["teamSelected"];
          bet.matchId  = match.id;
          bet.matchDate  = match.date;
          bet.userId = userId;
          if(!match.players)
            match.players = [];
          match.players.push(userId);  
          this.gameService.saveBetPlacedUsers(bet);
          user['points'] = user['points'] - 100;
          this.userService.updateUser(user);
          this.gameService.updateMatch(match);
  
        } else {
          this.error = true;
          this.errorMessage = "You do not have enough points"
        }
      }
    })
       
  }
}
