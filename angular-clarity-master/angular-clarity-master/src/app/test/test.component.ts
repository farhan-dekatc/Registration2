import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserRegistration1Service} from "../services/user-registration1.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private http: HttpClient, private userService: UserRegistration1Service, private router: Router) {
  }

  user: any;
  result: any;

  ngOnInit(): void {
    // this.checkemailExists({
    //   "email": "abcd@abcd.com"
    // })
  }

  // checkemailExists(email) {
  //       let idandct;
  //       this.http.post("http://localhost:9191/token/get-info",email).subscribe((res) => {
  //           console.log(res);
  //           idandct = res;
  //           console.log(idandct)
  //           this.router.navigate([`/about-work/${idandct.id}/${idandct.checkNumber}`]);
  //
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       )
  //       console.log(idandct);
  // }

  clicked() {
    this.userService.checkMailExists("menavadsadvu23@gmail.com").subscribe(
      (res) => {
        this.result = res;
      }
    )
  }

}
