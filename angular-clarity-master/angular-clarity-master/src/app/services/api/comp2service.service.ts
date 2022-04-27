import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class Comp2serviceService {

  private baseURL = "token/aboutwork_working"

  update(id: number, value: any): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, value);
  }

  constructor(

    private apiRequest: ApiRequestService,
  ) { }
}
