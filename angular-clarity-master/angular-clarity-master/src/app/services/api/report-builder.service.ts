import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiRequestService } from './api-request.service';
import { Observable } from 'rxjs';
import { ReportBuilder } from 'src/app/models/ReportBuilder';
import { ReportBuilderQuery } from 'src/app/models/ReportBuilderQuery';

@Injectable({
  providedIn: 'root'
})
export class ReportBuilderService {

  private reportBaseURL ='api/report-builder-by-id';
  private reportBaseURLSubmit ='api/report-builder';
  private masterQueryUrl ='api/add-master-query';
  private storage: Storage = sessionStorage;
  private moduleIdKey: string = "moduleId";
  private baseURLMasterQuery="api/master-query";
  constructor( private apiRequest: ApiRequestService) { }

  getModuleId(): number {
    let modId = +this.storage.getItem(this.moduleIdKey);
    return modId;
  }

  getAll(moduleId: number, page?: number, size?: number): Observable<any> {
    // create Request URL params
    let me = this;
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    params = params.append("moduleId", moduleId.toString());
    // get all
    return this.apiRequest.get(this.reportBaseURL, params);
  }

  //save report
  create(fbHeader: ReportBuilder, moduleId: number): Observable<ReportBuilder> {
    //`${this.baseURL}`
    let params: HttpParams = new HttpParams();
    params = params.append("moduleId", moduleId.toString());
   // params = params.append("formType", formType);
    return this.apiRequest.post(this.reportBaseURLSubmit, fbHeader, params);
  }

  //save report
  createQuery(reportId: number): Observable<any> {
    //`${this.baseURL}`
    let params: HttpParams = new HttpParams();
    params = params.append("reportId", reportId.toString());
   // params = params.append("formType", formType);
    return this.apiRequest.post(this.masterQueryUrl,params);
  }

  // update(reportId: number, functionRegister: ReportBuilder): Observable<ReportBuilder> {
  //   let params: HttpParams = new HttpParams();
  //   params = params.append("reportId", reportId.toString());
  //   return this.apiRequest.put(this.masterQueryUrl/reportId, functionRegister);
  // }

  update(id: number, functionRegister: ReportBuilder): Observable<ReportBuilder> {
    const _http = this.masterQueryUrl + "/" + id;
    return this.apiRequest.put(_http, functionRegister);
  }

  getMasterQuery(id: number): Observable<ReportBuilderQuery> {
    const _http = this.baseURLMasterQuery + "/" + id;
    return this.apiRequest.get(_http);
  }

  getMasterData(query:string): Observable<any> {
    //Create Request URL params
    let me = this;
    let params: HttpParams = new HttpParams();
     params = params.append('sql_query', query);
    return this.apiRequest.get('api/master-query-data',params);
}
delete(id: number): Observable<any> {
  const _http = this.masterQueryUrl + "/" + id;
  return this.apiRequest.delete(_http);
}
}
