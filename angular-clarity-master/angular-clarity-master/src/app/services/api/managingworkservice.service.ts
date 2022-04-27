import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from './api-request.service';

interface managing {
  managing_work: string
}

@Injectable({
  providedIn: 'root'
})
export class ManagingworkserviceService {
  private baseURL = "token/aboutwork_managing"


  constructor(
    private apiRequest: ApiRequestService
  ) { }


  update(id: number, value: managing): Observable<any> {
    console.log("id for" + id);
    console.log("value for" + value);
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, value);
  }
}
