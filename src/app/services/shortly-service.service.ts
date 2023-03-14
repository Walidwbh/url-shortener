import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortlyServiceService {
  // private shortlyUrl = "https://api.shrtco.de/v2/shorten";
  private shortlyUrl = "https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html";
  constructor(private httpClient: HttpClient) { }
  // method that returns short link
  getShortLink(link: any):Observable<any> {
    let headers = new HttpHeaders();
    //add postData
    let postData = new FormData();
    postData.append("url",link);
    return this.httpClient.post<any>(this.shortlyUrl,postData,{headers: headers}).pipe(retry(3),catchError(this.httpErrorHandler));
  }
  // method that handle errors for debugging
  private httpErrorHandler (error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      console.error(`A client side error occured. the error message is ${error.message}`);
    }else {
      console.error(`An error happened in the server. the http status code is ${error.status} and the error returned is ${error.message}`)
    }
    return throwError(()=>{
      new Error("Error occured please try again");
    })
  }
}
