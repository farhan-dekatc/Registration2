import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Rn_Fb_Header } from "src/app/models/Rn_Fb_Header";
import { Rn_Fb_Lines } from "src/app/models/Rn_Fb_Lines";
import { WireFrame } from "src/app/models/WireFrame";
import { Observable } from "rxjs";
import { ApiRequestService } from "./api-request.service";

export interface WireFrameList {
  id: number;
  name: string;
}

@Injectable()
export class WireframeService {
  private wireframeBaseURL ='api/wireframe';
  private wireFrameDropDownURL = 'api/wireframe-list'
  private wireFrameLinesURL = 'api/wireframe-lines' // used in edit view form

  private wireFrameLineURL = 'api/wireframe-line' // get fbLine by id
  private copyWireFrameURL = 'api/wireframe-copy';
  private projectIdKey: string = "projectId"; // used in wireframe type component
  private moduleIdKey: string = "moduleId";

  private storage: Storage = sessionStorage;
  constructor(
    private apiRequest: ApiRequestService
  ) {}

  public storeProjectId(projectId: number) {
    this.storage.setItem(this.projectIdKey, projectId.toString());
  }
  public removeProjectId() {
    this.storage.removeItem(this.projectIdKey);
  }
  getProjectId(): number {
    let prjId = +this.storage.getItem(this.projectIdKey);
    return prjId;
  }

  public storeModuleId(moduleId: number) {
    this.storage.setItem(this.moduleIdKey, moduleId.toString());
  }
  public removeModuleId() {
    this.storage.removeItem(this.moduleIdKey);
  }
  getModuleId(): number {
    let modId = +this.storage.getItem(this.moduleIdKey);
    return modId;
  }
  // ====== storage finish =======

  // ========== RB_FB_HEADER APIS =========== //

  getAll(moduleId: number, page?: number, size?: number): Observable<any> {
    // create Request URL params
    let me = this;
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    params = params.append("moduleId", moduleId.toString());
    // get all
    return this.apiRequest.get(this.wireframeBaseURL, params);
  }

  getById(id: number): Observable<Rn_Fb_Header> {
    const _http = this.wireframeBaseURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  // this is used in edit view form
  getLinesByHeaderId(id: number): Observable<WireFrame> {
    const _http = this.wireFrameLinesURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  create(fbHeader: Rn_Fb_Header, formType: string, moduleId: number): Observable<Rn_Fb_Header> {
    //`${this.baseURL}`
    let params: HttpParams = new HttpParams();
    params = params.append("moduleId", moduleId.toString());
    params = params.append("formType", formType);
    return this.apiRequest.post(this.wireframeBaseURL, fbHeader, params);
  }

  update(id: number, fbHeader: Rn_Fb_Header): Observable<Rn_Fb_Header> {
    const _http = this.wireframeBaseURL + "/" + id;
    return this.apiRequest.put(_http, fbHeader);
  }

  wireFrameDropDown() : Observable<WireFrameList[]> {
    return this.apiRequest.get(this.wireFrameDropDownURL);
  }

  copy(wireframeCopyForm: Object) :Observable<any> {
    return this.apiRequest.post(this.copyWireFrameURL, wireframeCopyForm);
  }

  // ======== RN FB LINE APIS =============//
  getLineById(id: number): Observable<Rn_Fb_Lines> {
    const _http = this.wireFrameLineURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  updateLineById(id: number, fbLine: Rn_Fb_Lines): Observable<any> {
    const _http = this.wireFrameLineURL + "/" + id;
    return this.apiRequest.put(_http, fbLine);
  }


  // create table for only-header, header-line, only-line, multiline form
  private createTableUrl: string = 'api/createTable';
  private createHLTableUrl: string = 'api/createTableHL';
  private createMLTableUrl: string = 'api/createTableMultiline';
  createTable(headerId: number, formType: string, data: Object) {
    let params: HttpParams = new HttpParams();
    params = params.append("header_id", headerId.toString());

    if(formType === 'header_only' || formType === 'line_only') {
      return this.apiRequest.post(this.createTableUrl, data, params);
    } else if (formType === 'header_line') {
      return this.apiRequest.post(this.createHLTableUrl, data, params);
    } else if(formType === 'multiline') {
      return this.apiRequest.post(this.createMLTableUrl, data, params);
    }
  }


  private buildMVCFormURL: string = 'api/build_wireframe';
  private buildForm: string ='api/SpringMVC_Hibernate_Mysql_Form_onlyHeader_Builder';
  private buildMVC_ML_FormURL: string = 'ml_build_form';
  // build mvc form
  buildMVCForm(formType: string, headerId: number) {
    let params: HttpParams = new HttpParams();
    params = params.append("header_id", headerId.toString());
    if(formType === 'multiline') {
      return this.apiRequest.get(this.buildMVC_ML_FormURL, params);
    } else {
      return this.apiRequest.get(this.buildMVCFormURL, params);
     // return this.apiRequest.get(this.buildForm, params);
    }
  }

  private buildAngularFormURL: string = 'build_angular_form';
  // build angular form
  buildAngularForm(headerId: number) {
    let params: HttpParams = new HttpParams();
    params = params.append("header_id", headerId.toString());
    return this.apiRequest.get(this.buildAngularFormURL, params);
  }

  private delete_MVC_OH_FormURL: string = 'delete_wireframe';
  private delete_MVC_OL_FormURL: string = 'delete_line_wireframe';
  private delete_MVC_HL_FormURL: string = 'delete_header_line_wireframe';
  private delete_MVC_ML_FormURL: string = 'delete_header_line_wireframe';
  deleteMVCForm(formType: string, headerId: number) {
    let params: HttpParams = new HttpParams();
    params = params.append("header_id", headerId.toString());
    if(formType === 'header_only') {
      return this.apiRequest.get(this.delete_MVC_OH_FormURL, params);
    } else if(formType === 'line_only') {
      return this.apiRequest.get(this.delete_MVC_OL_FormURL, params);
    } else if (formType === 'header_line') {
      return this.apiRequest.get(this.delete_MVC_HL_FormURL, params);
    } else if(formType === 'multiline') {
      return this.apiRequest.get(this.delete_MVC_ML_FormURL, params);
    }
  }

  private baseURl: string = 'api';
  dynamicBuilder(headerId: number, actionLink: string) {
    let params: HttpParams = new HttpParams();
    params = params.append("header_id", headerId.toString());
    return this.apiRequest.get("api/"+actionLink, params);
  }

  //============= MANUPULATE WIREFRAME PROPERTIES ===============//

  private addNewFieldInSectionURL = 'api/wireframe-add-field-in-section';
  private addNewFieldInLineSectionURL = 'api/wireframe-add-field-in-line-section';
  private updateFieldNameURL = 'api/wireframe-update-field-name';
  private deleteSectionURL = 'api/wireframe-delete-section';
  addFieldInSection(id: number, sectionNumber: number) :Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append("id", id.toString());
    params = params.append("section", sectionNumber.toString());
    return this.apiRequest.get(this.addNewFieldInSectionURL, params);
  }

  addFieldInLineSection(id: number, sectionNumber: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append("id", id.toString());
    params = params.append("section", sectionNumber.toString());
    return this.apiRequest.get(this.addNewFieldInLineSectionURL, params);
  }


  updateFieldName(id: number, body: Rn_Fb_Lines): Observable<any> {
    let _http = this.updateFieldNameURL + "/" + id;
    return this.apiRequest.post(_http, body);
  }

  private addSectionOrButtonURL = 'api/wireframe-add-section-button';
  addSectionOrButton(headerId, body: Object): Observable<any> {
    let _http = this.addSectionOrButtonURL + "/" + headerId;
    return this.apiRequest.post(_http, body);
  }


  deleteSection(headerId: number, sectionNumber: number): Observable<any> {
    let _http = this.deleteSectionURL + "/" + headerId;
    let params: HttpParams = new HttpParams();
    params = params.append("section_num", sectionNumber.toString());
    return this.apiRequest.get(_http, params);
  }

  private deleteFieldURL = 'api/wireframe-delete-field';
  deleteField(id: number) {
    let _http = this.deleteFieldURL + "/" + id;
    return this.apiRequest.get(_http);
  }



}
