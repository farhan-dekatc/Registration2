import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { student} from "src/app/models/Studentadd";
import { Observable } from "rxjs";
import { ApiRequestService } from "./api-request.service";
import { UserInfoService } from "../user-info.service";
@Injectable({
  providedIn: 'root'
})
export class StudentaddService {
  private baseURL = "api/studentadd";

  constructor(private apiRequest: ApiRequestService,
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
    getById(id: number): Observable<student> {
      const _http = this.baseURL + "/" + id;
      return this.apiRequest.get(_http);
    }
    create(college: student,current_json: any): Observable<any> {
      return this.apiRequest.post(this.baseURL, college);
    }




    update(id: number, projectSetup: student,current_json: any ): Observable<any> {
      let params: HttpParams = new HttpParams();
      params = params.append("current_json", current_json.toString());
      const _http = this.baseURL + "/" + id;
      return this.apiRequest.put(_http, projectSetup,params);
    }
    delete(id: number): Observable<any> {
      const _http = this.baseURL + "/" + id;
      return this.apiRequest.delete(_http);
    }
}
