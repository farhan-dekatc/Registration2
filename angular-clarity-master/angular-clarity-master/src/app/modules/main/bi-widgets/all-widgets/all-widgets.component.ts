import { Component, OnInit } from '@angular/core';
import { BiWidget } from 'src/app/models/BiWidget';
import { ActivatedRoute, Router } from '@angular/router';
import { BiWidgetSetupService } from 'src/app/services/api/bi-widget-setup.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-all-widgets',
  templateUrl: './all-widgets.component.html',
  styleUrls: ['./all-widgets.component.scss']
})
export class AllWidgetsComponent implements OnInit {
  moduleId: number;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  widget: BiWidget[];
  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  constructor(
    private excel: ExcelService,
    private toastr: ToastrService,

    private widgetService: BiWidgetSetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.moduleId = this.widgetService.getModuleId(); // get from session storage
    console.log(this.moduleId);

    this.getModuleReport(this.moduleId);
  }
  getModuleReport(id: number) {
    this.isLoading = true;
    //this.moduleService.getById(id).subscribe((data) => {
      this.widgetService.getAll(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      //this.wireFrames = data.rn_fb_headers;
      this.widget = data.items;
     this.rows = this.widget;
      this.temp = [...this.widget];
    });
  }

  goToAdd() {
    //this.router.navigate(["../add"], { relativeTo: this.route });
    this.router.navigate(["../add-widget"], { relativeTo: this.route });
  }


  doFilter($event){

  }
  goToEdit(id){

  }
  onExport() {
    this.excel.exportAsExcelFile(this.widget, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.widgetService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
    );
    if (id) {
      this.toastr.success('Deleted successfully');
          }

  }
}
