import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { UserInfoService } from './user-info.service';
import {catchError} from "rxjs/operators";

@Injectable()
export class oAuthService  {
  constructor(private userInfoService: UserInfoService,private http:HttpClient) {}

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    //let token = this.userInfoService.getStoredToken();
    //console.log('Token from session storage: ', token);
    headers = headers.append("Content-Type", "application/json");
    /* if (token !== null) {
      headers = headers.append("Authorization", token);
    } */
    return headers;
  }


  getGoogleAuth(): Observable<any> {

    return this.http
      .get("http://localhost:8080/auth/google", {
        headers: this.getHeaders(),
        // params: urlParams,
      }).pipe(
        catchError((error) => {
          return throwError(error || "Server error");
        })
      )
  }
}
