import { PointsService } from './../points.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  points;

  constructor(private service : PointsService) { }

  ngOnInit() {
    this.points = this.service.getAllPoints();

  }


}
