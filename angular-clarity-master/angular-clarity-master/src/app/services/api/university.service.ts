import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { university } from "src/app/models/university";
import { Observable } from "rxjs";
import { ApiRequestService } from "./api-request.service";
import { UserInfoService } from "../user-info.service";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private baseURL = "api/author";
  constructor(
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
  getById(id: number): Observable<university> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }
  create(college: university): Observable<any> {
    return this.apiRequest.post(this.baseURL, college);
  }

  update(id: number, projectSetup: university): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, projectSetup);
  }
  delete(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.delete(_http);
  }
}
