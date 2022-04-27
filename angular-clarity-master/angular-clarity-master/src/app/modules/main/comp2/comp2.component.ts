import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationError } from 'src/app/models/ValidationError';
import { Comp2serviceService } from 'src/app/services/api/comp2service.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.scss']
})
export class Comp2Component implements OnInit {

  public entryForm: FormGroup;
  updated = false;
  errorFields: ValidationError[] = [];

  values = [
    "Marketing",
    "Product",
    "Design",
    "Operations",
    "Sales",
    "Customer success",
    "HR",
    "IT",
    "Engineering",
    "General project management"
  ];
  id: number;

  constructor(

    private route: Router,
    private router: ActivatedRoute,
    private _fb: FormBuilder,
    private component2service: Comp2serviceService

  ) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id, "id in com2");

    this.entryForm = this._fb.group({
      working: [null],


    });

  }
  update() {
    this.component2service.update(this.id, this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
        // console.log(data.id, "user id");
        // this.aboutdata = data;
        // this.router.navigate(["../../all"], { relativeTo: this.route });
        this.route.navigate(["../comp3/" + this.id]);
      },
      // (error) => {
      //   console.log(error);
      //   const objectArray = Object.entries(error.error.fieldErrors);
      //   objectArray.forEach(([k, v]) => {
      //     console.log(k);
      //     console.log(v);
      //     this.errorFields.push({ field: k, message: v });
      //   });
      //   console.log(this.errorFields); // this will come from backend
      // }
    );
    // this.project = new updatecompfour();
  }


  onSubmit() {
    console.log(this.entryForm.value);

    this.updated = true;
    this.update();
  }
}
