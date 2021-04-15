import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { $ } from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://api.magicthegathering.io/v1";
  private LEGAL_SETS = "set=ALA,RTR,GTC,KTK"; // defined by Mark, expansions will need to be added here
  colorIdentity = "colorIdentity=B";
  rarity = "rarity=rare";

  private queryParamString = `?${this.LEGAL_SETS}&${this.colorIdentity}&${this.rarity}`

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
    return this.httpClient.get(`${ this.REST_API_SERVER }/cards/${ this.queryParamString }`).pipe(retry(3), catchError(this.handleError));
  }
}