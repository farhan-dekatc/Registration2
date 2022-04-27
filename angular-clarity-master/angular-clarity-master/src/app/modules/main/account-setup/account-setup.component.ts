import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alerts.service';
import { UserRegistrationService } from 'src/app/services/api/user-registration.service';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated

})
export class AccountSetupComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  firstName: string;
  email: string
  companyRegisterForm: FormGroup;
  submitted: boolean = false;
  errorMsg: any[] = [];

  ngOnInit(): void {
    this.firstName = this.userRegistrationService.getFirstName();
    console.log('AccountSetupComponent : ', this.firstName);
    this.email = this.userRegistrationService.getEmail();
    console.log('AccountSetupComponent', this.email);

    this.companyRegisterForm = this._fb.group({
      userEmail: [this.email],
      companyName: [null, [Validators.required]],
      gstNumber: [null],
    });
  }
  get f() {
    return this.companyRegisterForm.controls;
  }

  onSubmit() {
    console.log(this.companyRegisterForm.value);
    this.submitted = true;
    if (this.companyRegisterForm.invalid) {
      return;
    }
    this.onCreate();
  }


  onCreate() {
    this.errorMsg = [];
    this.userRegistrationService
      .saveCompany(this.companyRegisterForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.alertService.success('Registration successful', true);
          this.router.navigate(["/login"]);
          // remove credentials from storage if successful signup
          this.userRegistrationService.removeSignedUpUserInfo();
          this.userRegistrationService.removeStoredEmail();
        },
        (error) => {
          console.log("signup error ", error);
          this.alertService.error(error.error.message);
          //this.router.navigate(["/signup"]);
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
  }
}
