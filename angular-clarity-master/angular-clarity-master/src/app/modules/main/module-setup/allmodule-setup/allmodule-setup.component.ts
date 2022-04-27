import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModuleSetup } from 'src/app/models/Module_Setup';
import { AlertService } from 'src/app/services/alert.service';
import { ModulesetupService } from 'src/app/services/api/modulesetup.service';
import { ProjectSetupService } from 'src/app/services/api/project-setup.service';
import { WireframeService } from 'src/app/services/api/wireframe.service';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-allmodule-setup',
  templateUrl: './allmodule-setup.component.html',
  styleUrls: ['./allmodule-setup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AllmoduleSetupComponent implements OnInit {

  @ViewChild("getById") getById: TemplateRef<any>;
  @ViewChild("txId") txId: TemplateRef<any>;

  rowSelected :any= {};
  modaldelete=false;
  module;
  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  modules: ModuleSetup[];
  loading = false;
  // copy rules
  tech_stacks = ['SpringMVC-Hibernate-Mysql', 'Angular-SpringBoot-Mysql', 'React-ReactNative-Mysql', 'React-ReactNative-MongoDB', 'Angular-SpringBoot-MongoDB', 'Php-Laravel-Mysql', 'MEAN'];
  object_types = ['form', 'bi', 'report', 'api'];
  sub_object_types = ['only header', 'only line', 'header line', 'header multiline', 'wrokflow', 'setup', 'std report', 'bi report', 'rest api'];

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private excel: ExcelService,
    private moduleSetupService: ModulesetupService,
    private projectSetupService: ProjectSetupService,
    private alertService: AlertService,
    private wireframeService: WireframeService,
    private toastr: ToastrService,

  ) { }
  projectId: number;
  ngOnInit(): void {
    this.wireframeService.removeModuleId();
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['p_id'];
    });

    //this.initCopyRuleForm();
    this.getProjectModules(this.projectId);


  }
  getProjectModules(id: number) {
    this.isLoading = true;
    this.moduleSetupService.getProjectModules(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.modules = data.items;

    });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.moduleSetupService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
    );
    if (id) {
      this.toastr.success('Deleted successfully');
          }

  }
  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route ,queryParams: { p_id: this.projectId }});
  }
  onExport() {
    this.excel.exportAsExcelFile(this.module, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAction(id: number) {
    this.router.navigate(["../actions"], { relativeTo: this.route, queryParams: { m_id: id } });
  }
}
