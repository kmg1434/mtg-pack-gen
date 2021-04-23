import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {

  cards = [];
  stringJson: any;
  stringObject: [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {

    // this.dataService.getAllCards().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
    //   console.log(data)

    //   // Add safe, URL encoded_page parameter 
    //   // const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };

    //   this.cards = data['cards'];
      
    //   // Convert String obect to JSON
    //   this.stringJson = JSON.stringify(this.cards);
    //   // ConvertjSON to an object (that's compatable with *ngFor)
    //   this.stringObject = JSON.parse(this.stringJson);
    //   console.log("JSON object -", this.stringObject);

    // })  

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}