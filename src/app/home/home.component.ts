import { GameService } from './../game.service';
import { FlagIcon } from './../utilites/flagicon';
import { PointsService } from './../points.service';
import { Component, OnInit } from '@angular/core';
import { Match } from '../models/match.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  points;
  flags = new FlagIcon().flagList;
  matches : Observable<Match[]>;
 
  
  constructor(private pointService : PointsService,
    private gameService :  GameService) { 
    //console.log(this.flags);

  }

  ngOnInit() {
    this.points = this.pointService.getAllPoints();
    this.matches = this.gameService.getMatches();
  }


}
