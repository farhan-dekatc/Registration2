import { Component, OnInit } from '@angular/core';
import { PlayService } from 'src/app/services/api/play.service';
import { StudentaddService } from 'src/app/services/api/studentadd.service';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {College}from 'src/app/models/play';
import {student} from 'src/app/models/Studentadd';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationError } from 'src/app/models/ValidationError';

@Component({
  selector: 'app-editplay',
  templateUrl: './editplay.component.html',
  styleUrls: ['./editplay.component.scss']
})
export class EditplayComponent implements OnInit {

  updated = false;
  college: College;
  student:student;
  stringJson: any;

  id: number;
  errorFields: ValidationError[] = [];
  appToUpdate: College = null;
  trained = false;

  json: string = "";
  luisApp =
  {
    name: '',
    created: 1,
    trained: 1,
    tested: 1,
    updated:1,
    published: 1,

     };
     // Layout direction changing
  layout = {
    direction: "vertical",
    block1: "clr-col-lg-3 clr-col-12 ",
    block2: "clr-col-lg-9 clr-col-12 ",
  };

  timelineStyle = {
    step0: { state: "current", open: true, failed: false },
    step1: { state: "not-started", open: false, failed: false },
    step2: { state: "not-started", open: false, failed: false },
    step3: { state: "not-started", open: false, failed: false },
    step4: { state: "not-started", open: false, failed: false },
  };




  public entryForm: FormGroup;
  submitted = false;
  rowSelected :any= {};
  modalcomplete=false;

  constructor(
    private mainService: PlayService,
    private currentservice:StudentaddService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.college = new College();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.mainService.getBywfId(id).subscribe(
      (data) => {
        this.college = data;
      },
      (err) => {
        console.log(err);
      }
    );
this.currentservice.getById(id).subscribe(
  (data)=>{
    this.student=data;

    var current=JSON.parse(data.current_json);
    this.timelineStyle=current;
    console.log("data",data);
  },
  (err)=>{
    console.log(err);
  }
);


  }

// Change to Horizontal Layout
changeToHorizonTal() {
  this.layout = {
    direction: "horizontal",
    block1: "clr-col-lg-12 clr-col-12 height container",
    block2: "clr-col-lg-12 clr-col-12 container",
  }
}
// Change to Vertical Layout
changeToVertical() {
  this.layout = {
    direction: "vertical",
    block1: "clr-col-lg-3 clr-col-12 ",
    block2: "clr-col-lg-9 clr-col-12 ",
  }
}
onSave() {
  console.log("in update",this.college);
 this.mainService.updatewfid(this.id,this.college).subscribe(
   (data) => {
     console.log(data);
   },

 );
 if (this.id) {
   this.toastr.success('updated successfully');

 }
}
onnext(){
  this.router.navigate(["../../main/workflow"], { relativeTo: this.route });
}
reset() {
  this.json = "";
  this.luisApp =
  {
    name: '',
    trained: 1,
    tested: 1,
    updated:1,
    published: 1,


    created: 1,

  };

  this.timelineStyle = {
    step0: { state: "current", open: true, failed: false },
    step1: { state: "not-started", open: false, failed: false },
    step2: { state: "not-started", open: false, failed: false },
    step3: { state: "not-started", open: false, failed: false },
    step4: { state: "not-started", open: false, failed: false },
  };
}
current()
{
console.log (this.timelineStyle)
this.stringJson = JSON.stringify(this.timelineStyle);
    console.log("String json object :", this.stringJson);

this.mainService.update(this.id,this.college,this.stringJson).subscribe(
  (data) => {
    console.log(data);
  },

);
}


}
