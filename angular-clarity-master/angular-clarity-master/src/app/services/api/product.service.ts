import { Injectable } from '@angular/core';
import {product} from 'src/app/models/product';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRequestService } from './api-request.service';
import { UserInfoService } from '../user-info.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  private baseURL = "api/getproduct";
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
  getById(id: number): Observable<product> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }
  create(product: product): Observable<any> {
    return this.apiRequest.post(this.baseURL, product);
  }

  update(id: number, projectSetup: product): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, projectSetup);
  }
  delete(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.delete(_http);
  }
}
