import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


import {UserRegistrationService} from "src/app/services/api/user-registration.service";
import {UserRegistration1Service} from "../../../services/user-registration1.service";

export interface EmailRequest {
  email: string;
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UserRegistrationComponent implements OnInit {

  constructor(private _fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userRegistrationService: UserRegistrationService,
              private userService: UserRegistration1Service,
              private http: HttpClient) {
  }

  ngOnInit()
    :
    void {
    this.userRegistrationService.removeSignedUpUserInfo();
    this.userRegistrationService.removeStoredEmail();
    this.emailCheckForm = this._fb.group({
      email: ['', Validators.email]
    });
  }

  model: any = {};
  EmailRequest: EmailRequest;
  emailErrMsg: string = ""

  emailExistCheck() {
    console.log('input email: ', this.model.email);
    this.userRegistrationService.emailCheck(this.model.email)
      .subscribe((res) => {
        console.log('email check Res : ', res);
      }, (err) => {
        console.log(err);
      });
  }

  emailCheckForm: FormGroup;

  get f() {
    return this.emailCheckForm.controls;
  }

// onSubmit() {
//   console.log('this.emailCheckForm.value : ', this.emailCheckForm.value);
//   this.userRegistrationService.emailCheck(this.emailCheckForm.value)
//     .subscribe((res) => {
//       console.log('success: ', res);
//       let email: string = res.message;
//       console.log(email);
//       this.userRegistrationService.storeEmail(email);
//       this.router.navigate(["/selfregistration"]);
//     }, (err: HttpErrorResponse) => {
//       console.log(err);
//       console.log(err.error.message);
//       if (err.status === 409) {
//         this.emailErrMsg = 'Email Already Exists';
//       } else {
//         this.emailErrMsg = 'Server error';
//       }
//     });
// }

  result: any;

  onSubmit() {
    let email = this.emailCheckForm.value.email;
    this.userService.checkMailExists(email).subscribe((res) => {
      this.userService.storeEmail(email);
      this.router.navigate(["/varify-account"])
    }, (err: HttpErrorResponse) => {
      console.log(err)
      if (err.status === 409) {
        this.emailErrMsg = 'Email Already Exists';
      } else {
        this.emailErrMsg = 'Server error';
      }
    })
  }


  onSignUp() {
    this.router.navigate(["signup"]);
  }

  goToLogin() {
    this.router.navigate(["login"])
  }
}
