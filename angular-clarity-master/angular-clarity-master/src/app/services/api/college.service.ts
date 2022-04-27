import { Injectable } from '@angular/core';
import {College} from 'src/app/models/college';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRequestService } from './api-request.service';
import { UserInfoService } from '../user-info.service';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  private baseURL = "api/getstudent";
  constructor(
    private http: HttpClient,
    private apiRequest: ApiRequestService,
    private userInfoService: UserInfoService) { }

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

  update(id: number, projectSetup: College): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, projectSetup);
  }
  getById(id: number): Observable<College> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
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
