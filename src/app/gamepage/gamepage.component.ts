import { AuthService } from './../auth.service';
import { FlagIcon } from './../utilites/flagicon';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  matches;
  flags = new FlagIcon().flagList;
  disabledSubmitButton = false;

  constructor(
    private gameService : GameService
  ) {
  }

  ngOnInit() {
    this.matches = this.gameService.getMatches();
  }

  submit(ngf){
    let formMatchVal = ngf.value["match"];
    let teamSelected  = formMatchVal["teamSelected"];
    this.gameService.saveBetPlacedUsers(teamSelected);
    
  }
}
