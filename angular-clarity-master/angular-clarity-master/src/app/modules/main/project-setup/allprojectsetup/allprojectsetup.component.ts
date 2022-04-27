import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetup } from 'src/app/models/Project_setup';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectSetupService } from 'src/app/services/api/project-setup.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-allprojectsetup',
  templateUrl: './allprojectsetup.component.html',
  styleUrls: ['./allprojectsetup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated

})
export class AllprojectsetupComponent implements OnInit {
  loading = false;
  @ViewChild("getById") getById: TemplateRef<any>;
  @ViewChild("txId") txId: TemplateRef<any>;

  rowSelected :any= {};
  modaldelete=false;
  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  project;
  projects: ProjectSetup[];
  constructor( private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private excel: ExcelService,

    private projectSetupService: ProjectSetupService,) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.projectSetupService.getAll().subscribe((data) => {
      console.log(data);
      this.project = data;
      this.project = data.items;

    });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.project, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.projectSetupService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
    );
    if (id) {
      this.toastr.success('Deleted successfully');
          }

  }

  goToModule(id: number) {
    this.router.navigate(["../modules"], { relativeTo: this.route, queryParams: { p_id: id } });
  }
}
