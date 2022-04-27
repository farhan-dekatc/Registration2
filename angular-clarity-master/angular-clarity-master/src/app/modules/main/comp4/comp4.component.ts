import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { updatecompfour } from 'src/app/models/updtecomfour';
import { ValidationError } from 'src/app/models/ValidationError';
// import { CompfourService } from 'src/app/services/api/compfour.service';
import { ComponentfourserviceService } from 'src/app/services/api/componentfourservice.service';
@Component({
  selector: 'app-comp4',
  templateUrl: './comp4.component.html',
  styleUrls: ['./comp4.component.scss']
})
export class Comp4Component implements OnInit {

  public entryForm: FormGroup;
  id: number;
  aboutdata;
  updated = false;
  project: updatecompfour;
  // id: number;

  errorFields: ValidationError[] = [];
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private _fb: FormBuilder,
    private componentfourservice: ComponentfourserviceService
  ) { }

  ngOnInit(): void {
    this.project = new updatecompfour();
    this.id = this.router.snapshot.params['id'];
    console.log(this.id, "id in com4")


    this.entryForm = this._fb.group({
      companyname: [null],
      pancard: [null],


      // modulePrefix: [null]
    });

  }
  update() {
    console.log("Pan id::",this.entryForm.value.pancard);

    this.componentfourservice.update(this.id, this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
        // console.log(data.id, "user id");
        // this.aboutdata = data;
        // this.router.navigate(["../../all"], { relativeTo: this.route });
        this.route.navigate(["../comp2/" + this.id]);
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          this.errorFields.push({ field: k, message: v });
        });
        console.log(this.errorFields); // this will come from backend
      }
    );
    this.project = new updatecompfour();
  }

  // onSubmit() {
  //   this.userprofile.saveUser(this.entryForm.value).subscribe((data => {
  //     console.log(data.id, "Account id");
  //     this.aboutdata = data;
  //     this.updated = true;
  //     this.update();
  //     this.route.navigate(["../comp2"]);
  //   }))

  // }

  onSubmit() {


    // console.log(panform.value);
    console.log(this.entryForm.value);

    this.updated = true;
    this.update();
  }
}
