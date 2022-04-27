import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
import { ProductService } from 'src/app/services/api/product.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-allproduct2',
  templateUrl: './allproduct2.component.html',
  styleUrls: ['./allproduct2.component.scss']
})
export class Allproduct2Component implements OnInit {

  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  product;
  constructor(
    private mainService:ProductService,
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
      this.product = data;
      this.product = data.productEntity;

    });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.product, 'user_',
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
