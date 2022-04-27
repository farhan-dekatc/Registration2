import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { university } from 'src/app/models/university';
import { AlertService } from 'src/app/services/alert.service';
import { UniversityService } from 'src/app/services/api/university.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  rowSelected :any= {};
  modaldelete=false;
  modalEdit=false;
  modalAdd= false;
  public entryForm: FormGroup;

  loading = false;
  university;
  modalOpenedforNewLine = false;
  newLine: university = new university();

  name=['ashwini','akash','satyam','ganesh'];

  email = ['a@gmail.com', 'b@gmail.com', 'c@gmail.com', 'd@gmail.com'];

  subject = ['marathi', 'hindi', 'english'];

  booktype=['maths','language','science'];

  bookname: string[] = ['rich dad poor dad', 'The one thing', 'The momb who head farai', 'trump', 'lucky', 'syamchi aai',
    'aai', 'ek hota karwar', 'chawa', 'mutunjay', 'duniyadari', 'dad',
    'story book', 'horror story', 'poem'];

    writer=['thomas','saneguruji','john','ashwini','ash'];


   price = ['100', '200'];

  basic: boolean = false;

  id: number;
  submitted = false;
currentUrl="";
selected: any[] = [];
  constructor(
    private mainService: UniversityService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private excel: ExcelService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

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
    this.excel.exportAsExcelFile(this.university, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd(row) {

this.modalAdd = true;

  }
  onSubmit() {



    //console.warn("calling submit");

    //console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }



  onCreate() {
   // console.warn("in the oncreate ");
   this.modalAdd=false;
    this.mainService.create(this.entryForm.value).subscribe(data => {
      console.log(data)
      this.ngOnInit();

    },
      (error) => {
        console.log(error);
      }
    );
    if (this.entryForm.value) {
      this.toastr.success('Added successfully');

    }
  }



  get controls() {
    return (this.entryForm.get("book") as FormArray).controls;
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("book")).removeAt(index);
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("book")).push(this.initLinesForm());
  }
  update() {
    this.mainService.update(this.id, this.university).subscribe(
      (data) => {
        console.log(data);

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }






}
