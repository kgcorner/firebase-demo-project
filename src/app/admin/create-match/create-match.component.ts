import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Match } from 'src/app/models/match.model';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  matchForm : FormGroup;
  created : boolean;
  constructor(private fb : FormBuilder, private gameService: GameService) { 
    this.matchForm = this.fb.group({
      'team1' : ['', Validators.required],
      'team2':  ['', Validators.required],
      'date':   ['', Validators.required],
    })
    this.created = false;
  }

  ngOnInit() {
  }

  submit(form) {
    console.log(form);
    let match : Match = new Match();
    match.date = form.date;
    match.team1 = form.team1;
    match.team2 = form.team2;
    match.winner = "NA"
    this.gameService.createMatch(match);
    this.matchForm.reset();
    this.created = true;
  }


}
