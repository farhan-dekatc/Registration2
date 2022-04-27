import { Component, OnInit } from '@angular/core';
import { ValidationError } from 'src/app/models/ValidationError';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addreport-builder',
  templateUrl: './addreport-builder.component.html',
  styleUrls: ['./addreport-builder.component.scss']
})
export class AddreportBuilderComponent implements OnInit {

  entryForm: FormGroup;

  submitted = false;
  basic: boolean = false;
  fieldErrors: ValidationError[] = []; // backend validation field error message
  moduleId: number;
  formType: string;
  report_id:number;
  constructor(
    private reportBuilderService: ReportBuilderService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.moduleId = this.reportBuilderService.getModuleId();
    this.report_id=200;
    console.log(this.moduleId);
    this.entryForm = this._fb.group({
      report_name: [null],
      description: [null],
      report_tags: [null],
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
    this.fieldErrors = [];
    console.log("Report name::",this.entryForm.value.report_name);

    this.reportBuilderService
      .create(this.entryForm.value, this.moduleId)
      .subscribe(
        (data) => {
          console.log(data);
          console.log("Geting id::",data);

          //this.router.navigate(["../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
          this.router.navigate(["../all"], { relativeTo: this.route,queryParams: { report_id: this.report_id } });
        },
        (error) => {
          console.log(error);
          const objectArray = Object.entries(error.error.fieldErrors);
          objectArray.forEach(([k, v]) => {
            console.log(k);
            console.log(v);
            this.fieldErrors.push({ field: k, message: v });
          });
          console.log(this.fieldErrors); // this will come from backend
        }
      );
  }
}
