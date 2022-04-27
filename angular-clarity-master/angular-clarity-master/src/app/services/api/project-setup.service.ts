import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectSetup } from "src/app/models/Project_setup";
import { Observable } from "rxjs";
import { ApiRequestService } from "./api-request.service";

@Injectable()
export class ProjectSetupService {
  private baseURL = "api/project-setup";
  //private copyProjectURL = 'api/project-list';
  private copyProjectURL = 'api/project-copy';

  constructor(
    private apiRequest: ApiRequestService
  ) {}

  getAll(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    //const _http = this.baseURL + '/all';
    return this.apiRequest.get(this.baseURL, params);
  }

  getById(id: number): Observable<ProjectSetup> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }


  create(projectSetup: ProjectSetup): Observable<any> {
    return this.apiRequest.post(this.baseURL, projectSetup);
  }

  update(id: number, projectSetup: ProjectSetup): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, projectSetup);
  }

  copy(projectCopyForm: Object) :Observable<any> {
    return this.apiRequest.post(this.copyProjectURL, projectCopyForm);
  }
  delete(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.delete(_http);
  }
}
