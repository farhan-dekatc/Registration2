import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationError } from 'src/app/models/ValidationError';
import { BiWidgetSetupService } from 'src/app/services/api/bi-widget-setup.service';
@Component({
  selector: 'app-add-widgets',
  templateUrl: './add-widgets.component.html',
  styleUrls: ['./add-widgets.component.scss']
})
export class AddWidgetsComponent implements OnInit {

  public entryForm:FormGroup;
  submitted = false;
 basic: boolean = false;
 fieldErrors: ValidationError[] = []; // backend validation field error message
 moduleId: number;

 chart_types = [
   "bar-chart",
   "line-chart",
   "pie-chart",
   "polar-chart",
   "radar-chart",
   "doughnut-chart",
   "bar-chart-horizontal"
 ];
 color_scheme=[
   "BPGR",
   "RGBP"
 ]
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private widgetService: BiWidgetSetupService
  ) { }

  ngOnInit(): void {
    this.moduleId = this.widgetService.getModuleId();
    this.entryForm = this._fb.group({
      widget_name: [null],
      widget_description: [null],
      chart_type: [null],
      sql_query: [null],
      label: [null],
      color_scheme: [null],
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
    console.log(this.entryForm.value.chart_type)
    this.widgetService
      .create(this.entryForm.value, this.moduleId)
      .subscribe(
        (data) => {
           this.router.navigate(["../all"], { relativeTo: this.route});
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
