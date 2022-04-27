import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddemailsService } from 'src/app/services/api/addemails.service';

@Component({
  selector: 'app-page11',
  templateUrl: './page11.component.html',
  styleUrls: ['./page11.component.scss']
})
export class Page11Component implements OnInit {

  public entryForm: FormGroup;
  aboutdata;
  id: number;
  // checknumberID: number;
  constructor(private route: Router,
    private router: ActivatedRoute,
    private _fb: FormBuilder,
    private addemailservice: AddemailsService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id, "id in page11");



    // this.id = this.router.snapshot.params['checknumber'];
    // console.log(this.checknumberID, "checknumber in page11");

    this.entryForm = this._fb.group({

      email1: [null],
      email2: [null],
      email3: [null],
      email4: [null],


    });
  }

  onSubmit() {
    this.addemailservice.saveUser(this.entryForm.value, this.id).subscribe((data => {
      // console.log(data.userId, "User id");
      this.aboutdata = data;
      this.route.navigate(["../login/"]);

    }))


  }
}
