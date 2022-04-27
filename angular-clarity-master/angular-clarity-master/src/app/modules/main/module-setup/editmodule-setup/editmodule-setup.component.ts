import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleSetup } from 'src/app/models/Module_Setup';
import { ValidationError } from 'src/app/models/ValidationError';
import { ModulesetupService } from 'src/app/services/api/modulesetup.service';

@Component({
  selector: 'app-editmodule-setup',
  templateUrl: './editmodule-setup.component.html',
  styleUrls: ['./editmodule-setup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditmoduleSetupComponent implements OnInit {

  updated = false;
  module: ModuleSetup;
  id: number;
  projectId: number;

  fieldErors: ValidationError[] = []; // backend validation field error message

  tech_stacks = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moduleSetupService: ModulesetupService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['p_id'];

      console.log(this.projectId)
    });
    console.log("project id",this.projectId)

    this.module = new ModuleSetup();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.moduleSetupService.getById(id).subscribe(
      (data) => {
        this.module = data;
        console.log('Module : ', this.module);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  update() {
    this.moduleSetupService.update(this.id, this.module).subscribe(
      (data) => {
        console.log(data);


        this.router.navigate(["../../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
      },
      // (error) => {
      //   console.log(error);
      //   const objectArray = Object.entries(error.error.fieldErrors);
      //   objectArray.forEach(([k, v]) => {
      //     console.log(k);
      //     console.log(v);
      //     this.fieldErors.push({ field: k, message: v });
      //   });
        //console.log(this.fieldErors); // this will come from backend
      // }


    );



  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
