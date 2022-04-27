import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/api/product.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product1',
  templateUrl: './product1.component.html',
  styleUrls: ['./product1.component.scss']
})
export class Product1Component implements OnInit {
  rowSelected :any= {};
  modaldelete=false;
  modalEdit=false;
  modalAdd= false;
  public entryForm: FormGroup;

  loading = false;
  product;
  modalOpenedforNewLine = false;
  newLine: product = new product();

  constructor(
    private mainService: ProductService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private excel: ExcelService,
    private _fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getData();
    this.entryForm = this._fb.group({
      product: this._fb.array([this.initLinesForm()]),
    });

  }
  initLinesForm() {
    return this._fb.group({
      productname: [null],
      quantity: [null],
      date: [null],
      phone: [null],
      price:[null]
    })
  }
  getData() {
    this.mainService.getAll().subscribe((data) => {
      console.log(data);
      this.product = data;
      this.product = data.productEntity;

    });
  }
  onEdit(row) {
    this.rowSelected = row;
    this.modalEdit = true;
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

    onUpdate(id) {
      this.modalEdit = false;
         //console.log("in update");
      console.log("id  "+id);
      console.log( this.rowSelected );
      //console.log("out update");
      this.mainService.update(id,this.rowSelected).subscribe(
        (data) => {
          console.log(data);

        },

      );
      if (id) {
        this.toastr.success('Updated successfully');
              }

  }
  onExport() {
    this.excel.exportAsExcelFile(this.product, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd(row) {

this.modalAdd = true;

  }

 get controls() {
  return (this.entryForm.get("product") as FormArray).controls;
}
onRemoveLines(index: number) {
  (<FormArray>this.entryForm.get("product")).removeAt(index);
}
onAddLines() {
  (<FormArray>this.entryForm.get("product")).push(this.initLinesForm());
}

cancelInsert() {
  this.newLine = new product();
}
onSubmit() {
  console.log(this.entryForm.value);

  if (this.entryForm.invalid) {
    return;
  }
  this.onCreate();
}
onCreate() {

     this.modalAdd=false;
  this.mainService.create(this.entryForm.getRawValue()['product']).subscribe(
    (data) => {
      console.log(data);
      this.ngOnInit();

    },

  );
  if (this.entryForm.value) {
    this.toastr.success('Added successfully');

  }
}

}
