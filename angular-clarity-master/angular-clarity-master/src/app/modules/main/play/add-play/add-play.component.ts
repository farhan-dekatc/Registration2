import { Component, OnInit } from '@angular/core';
import { ValidationError } from 'src/app/models/ValidationError';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { PlayService} from 'src/app/services/api/play.service';
import { Router, ActivatedRoute } from '@angular/router';
import{product} from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-play',
  templateUrl: './add-play.component.html',
  styleUrls: ['./add-play.component.scss']
})
export class AddPlayComponent implements OnInit {

  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  errorFields: ValidationError[] = [];
product:FormArray;
  constructor(
    private collegeService: PlayService,
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
      emailId:[null],
      wf_instance_id:[null]
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

        this.router.navigate(["../../play/all"], { relativeTo: this.route });
      },

    );
    if (this.entryForm.value) {
      this.toastr.success('Added successfully');
          }
  }


}
