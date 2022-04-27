import { Component, OnInit } from '@angular/core';
import { ValidationError } from 'src/app/models/ValidationError';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { CollegeService} from 'src/app/services/api/college.service';
import { Router, ActivatedRoute } from '@angular/router';
import{product} from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  errorFields: ValidationError[] = [];
product:FormArray;
  constructor(
    private collegeService: CollegeService,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      studentname: [null],
      department: [null],
      joiningDate: [null],
      phone: [null],
      emailId:[null]
   });
  }

  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }
  onCreate() {

    this.collegeService.create(this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();

        this.router.navigate(["../../product/all"], { relativeTo: this.route });
      },

    );
    if (this.entryForm.value) {
      this.toastr.success('Added successfully');
          }
  }



}
