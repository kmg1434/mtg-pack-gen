import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface Card {
  heroesUrl: string;
  textfile: string;
  date: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  cards = [];
  stringJson: any;
  stringObject: [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getAllCards().subscribe((data: any[])=>{
      console.log(data)

      // Add safe, URL encoded_page parameter 
      const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };

      this.cards = data['cards'];
      
      // Convert String obect to JSON
      this.stringJson = JSON.stringify(this.cards);
      console.log("String json object :", this.stringJson);
      // console.log("Type :", typeof this.stringJson);
  
      // ConvertjSON to an object
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);

    })  

  }

}