import { Component, OnInit } from '@angular/core';
import { PlayService } from 'src/app/services/api/play.service';
import { AlertService } from 'src/app/services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-all-play',
  templateUrl: './all-play.component.html',
  styleUrls: ['./all-play.component.scss']
})
export class AllPlayComponent implements OnInit {

  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  college;
  constructor(
    private mainService: PlayService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private excel: ExcelService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();

  }
  getData() {
    this.mainService.getAll().subscribe((data) => {
      console.log(data);
      this.college = data;
      this.college = data.studentEntity;

    });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.college, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });

  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  goToEditwf(wfid: number) {
    this.router.navigate(["../edit/" + wfid], { relativeTo: this.route });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.mainService.delete(id).subscribe(
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
