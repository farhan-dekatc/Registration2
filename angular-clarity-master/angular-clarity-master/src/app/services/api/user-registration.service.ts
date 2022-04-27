import {HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PasswordResetComponent} from "src/app/modules/main/password-reset/password-reset.component";

import {UserRegistrationComponent} from "src/app/modules/main/user-registration/user-registration.component";
import {Observable} from "rxjs";
import {UserInfoService} from "../user-info.service";
import {ApiRequestService} from "./api-request.service";

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface Sys_Account {
  userEmail: string;
  companyName: string;
  workspace: string;
  gstNumber: string;
}

export interface SignedUpUser {
  userId: string;
  email: string;
  fullName: string;
  firstName: string;
}

export interface signUpInfo {
  success?: boolean;
  message?: string;
  landingPage?: string;
  user?: SignedUpUser;
}

@Injectable()
export class UserRegistrationService {
  private baseURL = "api/user-registration"; // still not in use
  private emailExistURL = "token/email-exists"; // email exist check
  private emailExistURLoauth = "token/email-exists2"; // email exist check when checking mail if from oauth
  private userRegURL = "token/user-registration";
  private companyRegURL = "token/company-registration";
  private resetPasswordURL = "api/reset-password";

  public registeredEmailKey: string = "registeredEmail";
  public localStorage: Storage = localStorage;
  public sessionStorage: Storage = sessionStorage;

  constructor(
    private apiRequest: ApiRequestService,
    private userInfoService: UserInfoService
  ) {
  }

  /* takenUsernames: any[] = [];
  checkIfUsernameExists(username: string): Observable<boolean> {
    return of(this.takenUsernames.includes(username))
      .pipe(delay(1000));
  }
  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  } */

  //Store userinfo from session storage
  storeEmail(userInfoString: string) {
    this.localStorage.setItem(this.registeredEmailKey, userInfoString);
  }
  getIdAndCt(email: string) {
    return this.apiRequest.post("get-info", email);
  }

  //Remove userinfo from session storage
  removeStoredEmail() {
    this.localStorage.removeItem(this.registeredEmailKey);
  }

  //Get email from session storage ( WILL REMOVE AFTER REGISTER)
  getStoredEmail(): string | null {
    try {
      let userInfoString: string = this.localStorage.getItem(
        this.registeredEmailKey
      );
      if (userInfoString) {
        return userInfoString;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }


  /* === store signed up user info in storage === */
  public registeredUserKey: string = "registeredUser";

  storeSignedUpUserInfo(userInfoString: string) {
    this.sessionStorage.setItem(this.registeredUserKey, userInfoString);
  }

  removeSignedUpUserInfo() {
    this.sessionStorage.removeItem(this.registeredUserKey);
  }

  //Get userinfo from session storage
  getSignedUpUserInfo(): SignedUpUser | null {
    try {
      let userInfoString: string = this.sessionStorage.getItem(
        this.registeredUserKey
      );
      if (userInfoString) {
        let userObj: SignedUpUser = JSON.parse(
          this.sessionStorage.getItem(this.registeredUserKey)
        );
        return userObj;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  // Get  Full Name from session storage
  getFirstName(): string {
    let userObj: SignedUpUser = this.getSignedUpUserInfo();
    if (userObj !== null) {
      //console.log('getFirstName() : ', userObj.firstName);
      return userObj.firstName;
    }
    return "no-user";
  }

  // Get  User Email from session storage
  getEmail(): string {
    let userObj: SignedUpUser = this.getSignedUpUserInfo();
    if (userObj !== null) {
      //console.log('getEmail() : ', userObj.email);
      return userObj.email;
    }
    return "no-user";
  }

  // Get  User Id from session storage
  getUserId(): string {
    let userObj: SignedUpUser = this.getSignedUpUserInfo();
    if (userObj !== null) {
      return userObj.userId;
    }
    return "no-user";
  }

  /* === store signed up user info in storage END === */

  /* === check if email is av ailable or not === */
  emailCheck(email: UserRegistrationComponent): Observable<any> {
    return this.apiRequest.post(this.emailExistURL, email);
  }
  emailCheckoauth(email: UserRegistrationComponent): Observable<any> {
    return this.apiRequest.post(this.emailExistURLoauth, email);
  }

  /* === signed up user (admin) === */

  /*  public landingPage:string = "/account-setup";
  saveUser(user: User): Observable<any> {
    let signupDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    let signupInfoReturn: signUpInfo;
    this.apiRequest.post(this.userRegURL, user).subscribe(
      (res) => {
        if (
          res !== undefined &&
          res !== null &&
          res.operationStatus === "SUCCESS"
        ) {
          signupInfoReturn = {
            success: true,
            message: res.operationMessage,
            landingPage: this.landingPage,
            user: {
              userId: res.item.userId,
              email: res.item.email,
              fullName: res.item.fullname,
              firstName: res.item.firstName,
            },
          };
          console.log('signupInfoReturn : ', signupInfoReturn);
          // store signed up user info in session storage for further case
          this.storeSignedUpUserInfo(JSON.stringify(signupInfoReturn.user));
        } else {
          //Create a faliure object that we want to send back to login page
          signupInfoReturn = {
            success: false,
            message: res.operationMessage,
            landingPage: "/create-account",
          };
        }
        signupDataSubject.next(signupInfoReturn);
      },
      (err) => {
        console.log("signup error ", err);
        signupInfoReturn = {
          success: false,
          message: err.url + " >>> " + err.statusText + "[" + err.status + "]",
          landingPage: "/create-account",
        };
      }
    );
    console.log('signupDataSubject : ', signupDataSubject);

    return signupDataSubject;
    //return this.apiRequest.post(this.userRegURL, user);
  } */

  saveUser(user: User): Observable<any> {
    return this.apiRequest.post(this.userRegURL, user);
  }

  /* company registration form */
  saveCompany(company: Sys_Account): Observable<any> {
    return this.apiRequest.post(this.companyRegURL, company);
  }

  resetPassword(passwordResetRequest: PasswordResetComponent): Observable<any> {
    return this.apiRequest.post(this.resetPasswordURL, passwordResetRequest);
  }

  /*==== CRUD APIS =====*/
  getAll(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let params: HttpParams = new HttpParams();
    params = params.append(
      "page",
      typeof page === "number" ? page.toString() : "0"
    );
    params = params.append(
      "size",
      typeof size === "number" ? size.toString() : "1000"
    );
    //const _http = this.baseURL + '/all';
    return this.apiRequest.get(this.baseURL, params);
  }

  getById(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  getByAccountId(): Observable<any[]> {
    const _http = this.baseURL + "/user-menu";
    return this.apiRequest.get(_http);
  }

  create(any: any): Observable<any> {
    return this.apiRequest.post(this.baseURL, any);
  }

  update(id: number, any: any): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, any);
  }

  getStoredName() {
    return this.localStorage.getItem("FullName");
  }

  removeStoredName() {
    this.localStorage.removeItem("FullName");
  }
}
