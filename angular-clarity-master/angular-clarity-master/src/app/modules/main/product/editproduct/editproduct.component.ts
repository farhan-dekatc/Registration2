import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { College } from "src/app/models/college";
import { ValidationError } from 'src/app/models/ValidationError';

import { CollegeService } from 'src/app/services/api/college.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  updated = false;
  college: College;
  id: number;
  errorFields: ValidationError[] = [];

  constructor(
    private collegeService: CollegeService,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.college = new College();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.collegeService.getById(id).subscribe(
      (data) => {
        this.college = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    this.collegeService.update(this.id, this.college).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
      },

    );
    this.college = new College();
    if (this.id) {
      this.toastr.success('Updated successfully');
          }
  }
  onSubmit() {
    this.updated = true;
    this.update();
  }



  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
