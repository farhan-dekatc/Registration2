import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  signUpInfo,
  UserRegistrationService,
} from "src/app/services/api/user-registration.service";
import { BehaviorSubject } from "rxjs";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,

})
export class SignupComponent implements OnInit {

  submitted: boolean = false;
  errorMsg: any[] = [];
  userRegistrationForm: FormGroup;
  email: string;

  constructor(
    private _fb: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.email = this.userRegistrationService.getStoredEmail();
    this.userRegistrationForm = this._fb.group({
      email: [this.email],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]], // Validators.minLength(8)
    });
  }


  get f() {
    return this.userRegistrationForm.controls;
  }

  onSubmit() {
    console.log(this.userRegistrationForm.value);
    this.submitted = true;
    if (this.userRegistrationForm.invalid) {
      return;
    }
    this.onCreate();
  }
 /*  onCreate() {
    this.errorMsg = [];
    //let signupInfoReturn:signUpInfo; // Object that we want to send back to Login Page
    this.userRegistrationService
      .saveUser(this.userRegistrationForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.user === undefined ) {
            return;
          }
          console.log('signup component Landing Page : ', res.landingPage);
          this.router.navigate(["/account-setup"]);
          //this.router.navigate([res.landingPage]);

          // REMOVE USER EMAIL FROM LOCAL STORAGE AFTER COMPLETE REGISTRATION
          //this.userRegistrationService.removeStoredEmail();
        },
        (error) => {
          console.log("signup error ", error);
          if (error.error.fieldErrors) {
            const objectArray = Object.entries(error.error.fieldErrors);
            objectArray.forEach(([k, v]) => {
              console.log(k);
              console.log(v);
              this.errorMsg.push({ field: k, message: v });
            });
            console.log(this.errorMsg);
          }
        }
      );
  } */

  onCreate() {
    this.errorMsg = [];
    let signupInfo: signUpInfo;
    this.userRegistrationService
    .saveUser(this.userRegistrationForm.value).subscribe(
    (res) => {
      if (res !== undefined && res !== null && res.operationStatus === "SUCCESS") {
        signupInfo = {
          user: {
            userId: res.item.userId,
            email: res.item.email,
            fullName: res.item.fullname,
            firstName: res.item.firstName,
          },
        };
        console.log('signupInfoReturn : ', signupInfo);
        // store signed up user info in session storage for further case
        this.userRegistrationService.storeSignedUpUserInfo(JSON.stringify(signupInfo.user));
        this.router.navigate(["/account-setup"]);
      } /* else { // for redirect
        this.router.navigate(["/account-setup"]);
      } */
    }, (error) => {
      console.log("signup error ", error);
          if (error.error.fieldErrors) {
            const objectArray = Object.entries(error.error.fieldErrors);
            objectArray.forEach(([k, v]) => {
              console.log(k);
              console.log(v);
              this.errorMsg.push({ field: k, message: v });
            });
            console.log(this.errorMsg);
          }
    });

  }
}
