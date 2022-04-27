import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Rn_Fb_Lines } from "src/app/models/Rn_Fb_Lines";
import { ValidationError } from "src/app/models/ValidationError";
import { AlertService } from "src/app/services/alert.service";
import { WireframeService } from "src/app/services/api/wireframe.service";
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  id: number;
  headerId: number;
  editMode: string;
  fbLine: Rn_Fb_Lines;
  updated: boolean =  false;
  expanded: boolean = true;

  fieldErors: ValidationError[] = [];

  dataTypes: string[] = ['int', 'varchar', 'longtext', 'double', 'boolean', 'datetime'];
  typeFields: string[] = ['textfield', 'textarea', 'url', 'email', 'dropdown', 'checkbox',
    'togglebutton', 'datetime', 'autocomplete', 'upload_field', 'currency_field', 'contact_field',
    'multiselect_autocomplete', 'multiselect_dropdown', 'masked'];

  action=['api_insert','api_update'];


  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private wireFrameService: WireframeService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.headerId = this.route.snapshot.params["id"]; // fb_header_id
    this.route.queryParams.subscribe((params) => {
      this.id = +params["id"];
      this.editMode = params["mode"];
    });
    this.getById(this.id);
    console.log(this.editMode);
  }
  getById(id: number) {
    console.log("get by id " +id);

    this.wireFrameService.getLineById(id).subscribe(
      (data) => {
        console.log('field property component ', data);
        this.fbLine = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  update() {
    //this.router.navigate(["../"],{ relativeTo: this.route });
    console.log('updated value = ',  this.fbLine);
    this.wireFrameService.updateLineById(this.id, this.fbLine).subscribe(
      (data) => {
        console.log("in update ");

        console.warn(data);
        this.router.navigate(["../"],{ relativeTo: this.route });
        //this.alertService.
      }

    );
  }

  onBasicPropertySubmit() {
    this.updated = true;
    this.update();
  }

  onAdditionalPropertySubmit() {
    this.updated = true;
    this.update();
  }



  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }


  sp_name: boolean = true;
  // sp name show
  checkSpForDropDown(value: boolean){
      this.sp_name = value;
  }
  dependent: boolean = true;
  // check dependent
  checkDependent(value: boolean) {
    this.dependent = value;
  }
  auto_complete: boolean = true;
  checkAutoComplete(value: boolean) {
    this.auto_complete = value;
  }
  sequence: boolean = true;
  checkSequence(value: boolean) {
    this.sequence = value;
  }
  calculated: boolean = true;
  checkCalculated(value: boolean) {
    this.calculated = value;
  }
  default: boolean = true;
  checkDefault(value: boolean) {
    this.default = value;
  }
  validation: boolean = true;
  checkValidation(value: boolean) {
    this.validation = value;
    //if(value === false) {
      //this.fbLine.v
    //}

  }
}
