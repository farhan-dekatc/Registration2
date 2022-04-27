import {Injectable} from '@angular/core';
import {ApiRequestService} from "./api/api-request.service";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {PasswordResetComponent} from "../modules/main/password-reset/password-reset.component";
import {UserRegistrationComponent} from "../modules/main/user-registration/user-registration.component";
import {UserInfoService} from "./user-info.service";
import {catchError} from "rxjs/operators";
import {AppConfig} from "../app-config";


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

@Injectable({
  providedIn: 'root'
})

export class UserRegistration1Service {

  //
  private baseURL = "api/user-registration"; // still not in use
  private emailExistURL = "token/email-exists"; // email exist check
  private emailExistURLoauth = "token/email-exists2"; // email exist check when checking mail if from oauth
  private userRegURL = "token/user-registration";
  private companyRegURL = "token/company-registration";
  private resetPasswordURL = "api/reset-password";

  private url = "http://localhost:9191/token/"


  public registeredEmailKey: string = "registeredEmail";
  public localStorage: Storage = localStorage;
  public sessionStorage: Storage = sessionStorage;

  constructor(
    private apiRequest: ApiRequestService,
    private userInfoService: UserInfoService,
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
  }

  //Store userinfo from session storage

  //Get email from session storage ( WILL REMOVE AFTER REGISTER)
  getStoredEmail(): string | null {
    try {
      let userInfoString: string = this.localStorage.getItem(
       "registeredEmail"
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

  getUserId(): string {
    let userObj: SignedUpUser = this.getSignedUpUserInfo();
    if (userObj !== null) {
      return userObj.userId;
    }
    return "no-user";
  }


  emailCheck(email: UserRegistrationComponent): Observable<any> {
    return this.apiRequest.post(this.emailExistURL, email);
  }

  emailCheckoauth(email: UserRegistrationComponent): Observable<any> {
    return this.apiRequest.post(this.emailExistURLoauth, email);
  }


  saveUser(user: User): Observable<any> {
    return this.apiRequest.post(this.userRegURL, user);
  }

  /* company registration form */
  saveCompany(company: Sys_Account): Observable<any> {
    return this.apiRequest.post(this.companyRegURL, company);
  }

  resetPassword(passwordResetRequest: PasswordResetComponent): Observable<any> {
    return this.apiRequest.post(this.resetPasswordURL, passwordResetRequest); //no token
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


  update(id: number, any: any): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, any);
  }

  checkMailExists(email: string) {
    return this.http.post(this.url+ "check-email", {"email": email});
  }

  create(email: string): Observable<any> {
    return this.http.post(this.url + "create-user", {"email": email});
  }

  sendConfirmationMail(email: string) {
    return this.http.post(this.url + "send-email", {"email": email})
  }

  getStoredName() {
    return this.localStorage.getItem("FullName");
  }

  removeStoredName() {
    this.localStorage.removeItem("FullName");
  }

  storeEmail(userInfoString: string) {
    this.localStorage.setItem("registeredEmail", userInfoString);
  }

  getIdAndCt(email: string) {
    return this.apiRequest.post("get-info", email);
  }

  //Remove userinfo from session storage
  removeStoredEmail() {
    this.localStorage.removeItem("registeredEmail");
  }

  post(url: string, body: any, urlParams?: HttpParams): Observable<any> {
    let me = this;
    let bodyTest = body instanceof Object ? JSON.stringify(body) : body;
    console.log('Post method String Vs. Object', bodyTest);
    return this.http
      .post(this.url + url, JSON.stringify(body), {
        headers: this.getHeaders(),
        params: urlParams,
      }).pipe(
        catchError((error) => {
          return throwError(error || "Server error");
        })
      )
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    //let token = this.userInfoService.getStoredToken();
    //console.log('Token from session storage: ', token);
    headers = headers.append("Content-Type", "application/json");
    /* if (token !== null) {
      headers = headers.append("Authorization", token);
    } */
    return headers;
  }


  destroySession() {
    localStorage.clear();
  }
}
