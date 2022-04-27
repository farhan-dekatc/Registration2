import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiRequestService } from "./api-request.service";

export interface DropDown {
  id: number;
  name: string;
}

@Injectable()
export class DropdownService {
  private projectListDropDownAPI = "api/project-list";
  private moduleListDropDownAPI = "api/module-list";
  private wireFrameListAPI = "api/wireframe-list";

  constructor(private apiRequest: ApiRequestService) {}

  getProjects(): Observable<DropDown[]> {
    return this.apiRequest.get(this.projectListDropDownAPI);
  }

  getModules(): Observable<DropDown[]> {
    return this.apiRequest.get(this.moduleListDropDownAPI);
  }
  getWireFrames(): Observable<DropDown[]> {
    return this.apiRequest.get(this.wireFrameListAPI);
  }

  // ======== DEPENDENT DROPDOWNS FOR TESTING =============
  private projectModuleAPI = 'api/project-modules/';
  private moduleWireFrameAPI = 'api/module-wireframes/';
  getProjectList(): Observable<DropDown[]> {
    return this.apiRequest.get(this.projectListDropDownAPI);
  }
  getProjectModuleList(projectId: number): Observable<DropDown[]> {
    const _http = this.projectModuleAPI + projectId;
    return this.apiRequest.get(_http);
  }

  getModuleWireFrameList(moduleId: number): Observable<DropDown[]> {
    const _http = this.moduleWireFrameAPI + moduleId;
    return this.apiRequest.get(_http);
  }

}
