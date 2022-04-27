import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserRegistrationService} from "../../../services/api/user-registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-googlemid',
  templateUrl: './oauthmid.component.html',
  styleUrls: ['./oauthmid.component.scss']
})
export class OauthmidComponent implements OnInit {

  user: any = {};
  public localStorage: Storage = localStorage;


  constructor(private http: HttpClient, private userService: UserRegistrationService, private router: Router) {
    console.log("aaaaaaaaaaa=  "+this.userService.getStoredEmail());
    this.http.post<any>(`http://localhost:9191/token/getUser`,{
	email: this.userService.getStoredEmail()
}).subscribe(
      (res) => {
        console.log(res)
        this.user = res;
        // this.user.email = "usertest4@gmail.com"
        console.log("email in console = "+ this.user.email)
        
        console.log(this.userService.getStoredEmail())
        if (this.user.email != this.userService.getStoredEmail()) {
          console.log(this.user.email, "is not same as ", this.userService.getStoredEmail());
          this.router.navigate(["/error-page"])
          return
        }
        this.localStorage.setItem("FullName", this.user.displayName);
        let objEmail = {
			email: this.user.email
		}
        this.checkemailExists(objEmail)
      },
      (err) => {
        console.log(err)
        this.checkemailExists({
          "email": this.user.email
        })
      }
    )
  }


  ngOnInit(): void {

  }

  checkemailExists(email) {
	console.log("in angular = "+email)

	
    this.http.post("http://localhost:9191/token/email-exists2", email).subscribe((res) => {
        let idandct;
        this.http.post("http://localhost:9191/token/get-info", email).subscribe((res) => {
            idandct = res;
            this.router.navigate([`/about-work/${idandct.id}/${idandct.checkNumber}`]);
          },
          (err) => {
            console.log(err);
          }
        )
      }
      , (err: HttpErrorResponse) => {
        if (err.status == 409) {
          this.router.navigate(["/error-page"]);
        }
      })
  }

}
