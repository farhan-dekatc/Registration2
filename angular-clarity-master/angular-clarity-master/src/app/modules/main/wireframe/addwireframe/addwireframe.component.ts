import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ValidationError } from "src/app/models/ValidationError";
import { AlertService } from "src/app/services/alert.service";
import { DropDown, DropdownService } from "src/app/services/api/dropdown.service";
import { TechnologyStackService } from "src/app/services/api/technology-stack.service";
import { WireframeService } from "src/app/services/api/wireframe.service";

@Component({
  selector: 'app-addwireframe',
  templateUrl: './addwireframe.component.html',
  styleUrls: ['./addwireframe.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddwireframeComponent implements OnInit {
  tech_stacks=[];
  object_types = ["form", "bi", "report", "api"];
  sub_object_types = [
    "only header",
    "only line",
    "header line",
    "header multiline",
    "wrokflow",
    "setup",
    "std report",
    "bi report",
    "rest api",
  ];

  entryForm: FormGroup;

  submitted = false;
  basic: boolean = false;
  fieldErrors: ValidationError[] = []; // backend validation field error message
  moduleId: number;
  formType: string;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dropdownService: DropdownService,
    private wireframeService: WireframeService,
    private alertService: AlertService,
    private technologyStackService:TechnologyStackService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.formType = params["formType"];
      console.log(this.formType);
    });
    this.moduleId = this.wireframeService.getModuleId();
    console.log(this.moduleId);
    this.entryForm = this._fb.group({
      techStack: [null],
      objectType: [null],
      subObjectType: [null],
      uiName: [null],
    });

    // copy form
    this.copyWireFrameForm = this._fb.group({
      from_projectId: [null],
      from_moduleId: [null],
      from_WireFrameId: [null],
      to_uiName: [null],
    });

    // dropdowns
    this.getAllDropDowns();

    //for dynamic tech stack
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)

      for(let ts of data.items)
      {
        if(ts.tech_stack==null)
        {
          return;
        }
        console.warn(ts.tech_stack);

        this.tech_stacks.push(ts.tech_stack)

      }

    });
  }

  onSubmit() {
    console.log("in add wireframe  onsubmit");
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }

  onCreate() {
   console.log("in add wireframe  oncreate",this.formType,this.moduleId);


    this.wireframeService
      .create(this.entryForm.value, this.formType, this.moduleId)
      .subscribe(
        (data) => {
          console.log(data);

          //this.router.navigate(["../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
          this.router.navigate(["../all"], { relativeTo: this.route });
        },
        (error) => {
          console.log(error);
          // const objectArray = Object.entries(error.error.fieldErrors);
          // objectArray.forEach(([k, v]) => {
          //   console.log(k);
          //   console.log(v);
          //   this.fieldErrors.push({ field: k, message: v });
          // });
          // console.log(this.fieldErrors); // this will come from backend
        }
      );
  }

  // copy wireframe
  copyWireFrameForm: FormGroup;
  coppied = false;
  copyWireFrame() {
    console.log(this.copyWireFrameForm.value);
    this.coppied = true;
    if (this.copyWireFrameForm.invalid) {
      return;
    }
    this.wireframeService.copy(this.copyWireFrameForm.value).subscribe(
      (data) => {
        console.log(data);
        //this.alertService.success()
        this.router.navigate(["../all"], { relativeTo: this.route });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ======= dropdowns ====== //

  projects: DropDown[];
  getProjectDropDown() {
    this.dropdownService.getProjects().subscribe(
      (res) => {
        console.log(res);
        this.projects = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modules: DropDown[];
  getModulesDropDown() {
    this.dropdownService.getModules().subscribe(
      (res) => {
        console.log(res);
        this.modules = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  changeModule(id: number) {
    console.log("project id : ", id);
    this.dropdownService.getProjectModuleList(id).subscribe(
      (res) => {
        console.log("module list ", res);
        this.modules = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  wireframes: DropDown[];
  getWireFrameDropDown() {
    this.dropdownService.getWireFrames().subscribe(
      (res) => {
        console.log(res);
        this.wireframes = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  changeWireFrame(id: number) {
    console.log("module id : ", id);
    this.dropdownService.getModuleWireFrameList(id).subscribe(
      (res) => {
        console.log("wireframe list ", res);
        this.wireframes = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllDropDowns() {
    this.getProjectDropDown();
    //this.getModulesDropDown();
    //this.getWireFrameDropDown();
  }
}
