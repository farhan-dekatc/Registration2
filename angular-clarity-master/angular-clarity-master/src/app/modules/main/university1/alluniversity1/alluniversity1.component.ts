import { Component, OnInit } from '@angular/core';
import {UniversityService} from 'src/app/services/api/university.service';
import { university } from 'src/app/models/university';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-alluniversity1',
  templateUrl: './alluniversity1.component.html',
  styleUrls: ['./alluniversity1.component.scss']
})
export class Alluniversity1Component implements OnInit {

  public entryForm: FormGroup;
  university;
  rowSelected :any= {};
  modaldelete=false;
  loading = false;

  constructor(
    private mainService: UniversityService,
    private _fb: FormBuilder,
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
      this.university = data;
      this.university = data.author;

    });

    this.entryForm = this._fb.group({
      name:[null] ,
      email:[null] ,
      subject:[null] ,
      phone:[null] ,


        book: this._fb.array([this.initLinesForm()]),



      });

  }
  initLinesForm() {
    return this._fb.group({

    booktype:[null] ,
    bookname:[null] ,
    price:[null] ,
    writer:[null] ,
    code:[null] ,


    });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.university, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });

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
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
}
