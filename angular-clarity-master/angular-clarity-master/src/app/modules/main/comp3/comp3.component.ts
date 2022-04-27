import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationError } from 'src/app/models/ValidationError';
import { ManagingworkserviceService } from 'src/app/services/api/managingworkservice.service';
@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.scss']
})
export class Comp3Component implements OnInit {

  id: number;
  public entryForm: FormGroup;
  updated = false;
  errorFields: ValidationError[] = [];
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private _fb: FormBuilder,
    private managingwork: ManagingworkserviceService
  ) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id, "id in com3");

    this.entryForm = this._fb.group({
      managing_work: [null]


    });
  }
  update() {
    console.log("managing_work" + this.entryForm);
    this.managingwork.update(this.id, this.entryForm.value).subscribe(
      (data) => {

        console.log(data);
        // console.log(data.id, "user id");
        // this.aboutdata = data;
        // this.router.navigate(["../../all"], { relativeTo: this.route });
        this.route.navigate(["../page11/" + this.id]);
      },

    );

  }



  onSubmit() {
    console.log(this.entryForm.value);

    this.updated = true;
    this.update();
  }

  // goToAdd() {
  //   this.route.navigate(["../page11"]);
  // }


}
