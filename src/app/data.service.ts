import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { $ } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://api.magicthegathering.io/v1";
  private LEGAL_SETS = "set=ALA,RTR,GTC,KTK"; // defined by Mark, expansions will need to be added here
  public colorIdentity = "colorIdentity=U,B,R";
  public colorIdentityObj = []; 

  public rareRarity = "rarity=rare,mythic";
  public uncommonRarity = "rarity=uncommon";
  public commonRarity = "rarity=common";

  // amount of card rarities per booster pack
  public commonCount = 10;
  public uncommonCount = 3;
  public rareCount = 1; // or mythic

  public page = "page=1";
  public pageSize = "pageSize=1";
  public pageParams = `${this.page}&${this.pageSize}`;

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

  // 1/8th of the time is mythic
  private getRareQueryParamString = `?random=true&${this.LEGAL_SETS}&${this.colorIdentity}&${this.rareRarity}&page=1&pageSize=1`;
  public getRareCard(){
    return this.httpClient.get(`${ this.REST_API_SERVER }/cards/${ this.getRareQueryParamString }`)
                          .pipe(retry(3), catchError(this.handleError));
  }

  private getCommonQueryParamString = `?random=true&${this.LEGAL_SETS}&${this.colorIdentity}&${this.commonRarity}&&page=1&pageSize=10`

  public getCommonCard(){
    return this.httpClient.get(`${ this.REST_API_SERVER }/cards/${ this.getCommonQueryParamString }`)
    .pipe(retry(3), catchError(this.handleError));
  }

  private getUncommonQueryParamString = `?random=true&${this.LEGAL_SETS}&${this.colorIdentity}&${this.uncommonRarity}&&page=1&pageSize=3`
  public getUncommonCard(){
    return this.httpClient.get(`${ this.REST_API_SERVER }/cards/${ this.getUncommonQueryParamString }`)
    .pipe(retry(3), catchError(this.handleError));
  }

}