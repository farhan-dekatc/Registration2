import { Injectable } from '@angular/core';
import {Studentaddmision}from 'src/app/models/studentaddmision';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRequestService } from './api-request.service';
import { UserInfoService } from '../user-info.service';
@Injectable({
  providedIn: 'root'
})
export class StudentaddmisionService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  private baseURL = "api/getaddmision";
  constructor(
    private http: HttpClient,
    private apiRequest: ApiRequestService,
    private userInfoService: UserInfoService
  ) { }
  getAll(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    //const _http = this.baseURL + '/all';
    console.log(this.userInfoService.getUserInfo().userId);
    let id = this.userInfoService.getUserInfo().userId;
    return this.apiRequest.get(this.baseURL, params);
  }

  update(id: number, projectSetup: Studentaddmision): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, projectSetup);
  }

  delete(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.delete(_http);
  }


  create(college:Studentaddmision): Observable<any> {
    console.log("in a service");
    console.log(college);


    return this.apiRequest.post(this.baseURL, college);
  }

}
