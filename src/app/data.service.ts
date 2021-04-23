import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { $ } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Pagination
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  private REST_API_SERVER = "https://api.magicthegathering.io/v1";
  private LEGAL_SETS = "set=ALA,RTR,GTC,KTK"; // defined by Mark, expansions will need to be added here
  public colorIdentity = "colorIdentity=B";
  public rareRarity = "rarity=rare,mythic";
  public uncomonRarity = "rarity=uncommon";
  public commonRarity = "rarity=common";

  // amount of card rarities per booster pack
  public commonCount = 10;
  public uncommonCount = 3;
  public rareCount = 1; // or mythic

  public page = "page=1";
  public pageSize = "pageSize=1";
  public pageParams = `${this.page}&${this.pageSize}`;

  private getAllQueryParamString = `?${this.LEGAL_SETS}&${this.colorIdentity}&${this.rareRarity}&${this.pageParams}`;

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getAllCards(){
    // Add safe, URL encoded_page parameter 
    const options = { params: new HttpParams({fromString: "page=1&pageSize=20"}) };

    return this.httpClient.get(`${ this.REST_API_SERVER }/cards/${ this.getAllQueryParamString }`)
                          .pipe(retry(3), catchError(this.handleError));
  }

  private getCommonQueryParamString = `?${this.LEGAL_SETS}&${this.colorIdentity}&${this.commonRarity}&${this.pageParams}`

  public getCommonCard(){
    return this.httpClient.get(`${ this.REST_API_SERVER }/cards/${ this.getCommonQueryParamString }`)
    .pipe(retry(3), catchError(this.handleError));
  }

  // pagination parse function
  parseLinkHeader(header) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
  }

}