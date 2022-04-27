import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectSetup } from 'src/app/models/Project_setup';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentfourserviceService {
  private baseURL = "token/aboutwork2";


  update(id: number, data): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, data);
  }

  constructor(
    private apiRequest: ApiRequestService,
  ) { }
}
