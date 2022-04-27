import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BiWidget } from 'src/app/models/BiWidget';
import { DropDown } from './dropdown.service';

@Injectable({
  providedIn: 'root'
})
export class BiWidgetSetupService {

  private storage: Storage = sessionStorage;
  private moduleIdKey: string = "moduleId";
  private widgetBaseURL ='api/widget-details';
  private widgetSaveUrl ='api/widget-details';
  private widgetListAPI ='api/widget-list/';
  private getwidget='api/getwidget/';
private updatewidget='api/updatewidget/';
  constructor(private apiRequest: ApiRequestService) { }

  getModuleId(): number {
    let modId = +this.storage.getItem(this.moduleIdKey);
    return modId;
  }

  getwidgetList(moduleId: number): Observable<DropDown[]> {
    const _http = this.widgetListAPI + moduleId;
    return this.apiRequest.get(_http);
  }

  getwidgetbyid(Id: number): Observable<any> {
    const _http = this.getwidget + Id;
    return this.apiRequest.get(_http);
  }

  updatewidgetbyid(Id: number,widget:any): Observable<any> {
    const _http = this.updatewidget + Id;
    return this.apiRequest.put(_http,widget);
  }

  getAll(moduleId: number, page?: number, size?: number): Observable<any> {
    // create Request URL params
    let me = this;
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    params = params.append("moduleId", moduleId.toString());
    // get all
    return this.apiRequest.get(this.widgetBaseURL, params);
  }

  //save report
  create(widget: BiWidget, moduleId: number): Observable<BiWidget> {
    let params: HttpParams = new HttpParams();
    params = params.append("moduleId", moduleId.toString());
    return this.apiRequest.post(this.widgetSaveUrl, widget, params);
  }

  getOrderStats2(field:string): Observable<any> {
    return this.apiRequest.get('api/order-stats-2/' + field );
}
delete(id: number): Observable<any> {
  const _http = this.updatewidget + "/" + id;
  return this.apiRequest.delete(_http);
}
}
