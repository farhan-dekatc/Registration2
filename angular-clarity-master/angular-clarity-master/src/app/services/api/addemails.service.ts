import { Injectable } from '@angular/core';
//import { id } from '@swimlane/ngx-datatable/release/utils';
import { Observable } from 'rxjs';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class AddemailsService {


  private addemailUrl = 'token/addemails';



  constructor(
    private apirequest: ApiRequestService

  ) { }

  saveUser(data, id: number): Observable<any> {
    return this.apirequest.post(this.addemailUrl + "/" + id, data);

  }

}
