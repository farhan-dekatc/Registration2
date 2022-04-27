import { Component, OnInit } from '@angular/core';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { ReportBuilder } from 'src/app/models/ReportBuilder';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-allreport-builder',
  templateUrl: './allreport-builder.component.html',
  styleUrls: ['./allreport-builder.component.scss']
})
export class AllreportBuilderComponent implements OnInit {

  moduleId: number;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  reports: ReportBuilder[];
  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  constructor(
    private reportBuilderService: ReportBuilderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private excel: ExcelService,
  ) { }

  ngOnInit(): void {
    this.moduleId = this.reportBuilderService.getModuleId(); // get from session storage
    console.log(this.moduleId);

    this.getModuleReport(this.moduleId);
  }
  getModuleReport(id: number) {
    this.isLoading = true;
    //this.moduleService.getById(id).subscribe((data) => {
      this.reportBuilderService.getAll(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      //this.wireFrames = data.rn_fb_headers;
      this.reports = data.items;
      console.log('reports: ', this.reports);
      this.rows = this.reports;
      this.temp = [...this.reports];
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
    this.reportBuilderService.delete(id).subscribe(
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
    //this.router.navigate(["../add"], { relativeTo: this.route });
    this.router.navigate(["../add"], { relativeTo: this.route });
  }
  doFilter(event){

  }
  goToReadOnly(id: number) {
    this.router.navigate(["../readonly/" + id], { relativeTo: this.route });
  }

  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.rows, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
}
