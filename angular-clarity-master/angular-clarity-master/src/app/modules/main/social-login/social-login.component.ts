import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRegistrationService} from 'src/app/services/api/user-registration.service';
import {HttpClientModule} from "@angular/common/http";
import {UserRegistration1Service} from "../../../services/user-registration1.service";

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated

})
export class SocialLoginComponent implements OnInit {

  constructor(
    private userRegistrationService: UserRegistrationService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClientModule,
    private userService: UserRegistration1Service
  ) {
  }

  email: string;

  ngOnInit(): void {
    this.email = this.userRegistrationService.getStoredEmail();

  }

  goToGoogle() {
    // this.router.navigate(["https://localhost:8080/auth/google"]);
    window.location.href = 'http://localhost:9191/oauth2/authorization/google';
  }

  goToLinkedIn() {
    window.location.href = "http://localhost:5000/auth/linkedin";
    // this.router.navigate(["/about-work"]);
  }

  goToSelfRegistration() {
    this.userService.create(this.userService.getStoredEmail()).subscribe((res) => {
        this.userService.sendConfirmationMail(this.userService.getStoredEmail()).subscribe((res) => {
            console.log(res)
          this.router.navigate(["/selfregistration"])
          }
          , (err) => {
            console.log(err)
          }
        )
      },
      (err) => {
        console.log(err)
      });
  }


}
