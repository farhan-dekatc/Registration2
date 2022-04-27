import { Injectable } from '@angular/core';
import {College} from 'src/app/models/play';
import { student} from "src/app/models/Studentadd";

import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRequestService } from './api-request.service';
import { UserInfoService } from '../user-info.service';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  private baseURL = "api/student";
 private baseURL1= "api/studentwf_id";
 private baseURL3="api/currentObj";
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

  //update json object
  update(id: number,projectSetup: College,current_json: any): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append("current_json", current_json.toString());
    //const _http = "api/currentObj/" + id;
    const _http = this.baseURL3 + "/" + id;

    return this.apiRequest.put(_http,projectSetup, params);
  }


  getById(id: number): Observable<College> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }
  getBywfId(id: number): Observable<College> {
    const _http = this.baseURL1 + "/" + id;
    return this.apiRequest.get(_http);
  }
  updatewfid(id: number, projectSetup: College): Observable<any> {
    const _http = this.baseURL1 + "/" + id;
    return this.apiRequest.put(_http, projectSetup);
  }
  delete(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.delete(_http);
  }


  create(college:College): Observable<any> {
    console.log("in a service");
    console.log(college);


    return this.apiRequest.post(this.baseURL, college);
  }
  public deleteApp(appName: string, force: boolean = true): Observable<HttpResponse<any>> {
    return this.http.delete(this.buildUrl("/deleteApp"),{ params: { name: appName, force: String(force)}, observe: 'response' });
  }
  private buildUrl(uri: string): string {
    return this.baseURL+ uri;
  }

}
