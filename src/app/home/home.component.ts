import { FlagIcon } from './../utilites/flagicon';
import { PointsService } from './../points.service';
import { Component, OnInit } from '@angular/core';
import { BindingFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  points;
  flags = new FlagIcon().flagList;
 
  
  constructor(private service : PointsService) { 
    //console.log(this.flags);
  }

  ngOnInit() {
    this.points = this.service.getAllPoints();

  }


}
