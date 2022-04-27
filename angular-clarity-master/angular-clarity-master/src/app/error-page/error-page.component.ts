import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRegistration1Service} from "../services/user-registration1.service";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  user: any;
  storedmail:string;
  isEmailDifferent:boolean=false;


  constructor(private http: HttpClient,
              private userService: UserRegistration1Service
  ) {
  }

  ngOnInit(): void {
    this.getMail();

  }

  getMail() {
    this.http.get("http://localhost:5000/getUser").subscribe(
      (res) => {
        this.user = res;
        this.storedmail  = this.userService.getStoredEmail();
        if(this.user.email!=this.storedmail){
          this.isEmailDifferent=true;
        }
        this.userService.destroySession();
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
