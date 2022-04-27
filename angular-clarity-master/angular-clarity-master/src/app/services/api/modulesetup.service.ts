
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ModuleSetup } from "src/app/models/Module_Setup";
import { Observable } from "rxjs";
import { ApiRequestService } from "./api-request.service";
@Injectable({
  providedIn: 'root'
})
export class ModulesetupService {
  private baseURL = "api/module-setup";
  private copyModuleURL = 'api/module-copy';
  constructor(
    private apiRequest: ApiRequestService
  ) { }

  getAll(page?: number, size?: number): Observable<any> { // not in use
    //Create Request URL params
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    //const _http = this.baseURL + '/all';
    return this.apiRequest.get(this.baseURL, params);
  }

  getProjectModules(projectId:number, page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let params: HttpParams = new HttpParams();
    params = params.append("projectId", projectId.toString());
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    //const _http = this.baseURL + '/all';
    return this.apiRequest.get(this.baseURL, params);
  }

  getById(id: number): Observable<ModuleSetup> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  getByAccountId(): Observable<ModuleSetup[]> {
    const _http = this.baseURL + "/user-menu";
    return this.apiRequest.get(_http);
  }

  create(moduleSetup: ModuleSetup, projectId: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append("p_id", projectId.toString());
    return this.apiRequest.post(this.baseURL, moduleSetup, params);
  }

  update(id: number, moduleSetup: ModuleSetup): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, moduleSetup);
  }
  delete(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.delete(_http);
  }

  copy(moduleCopyForm: Object) :Observable<any> {
    return this.apiRequest.post(this.copyModuleURL, moduleCopyForm);
  }
}
