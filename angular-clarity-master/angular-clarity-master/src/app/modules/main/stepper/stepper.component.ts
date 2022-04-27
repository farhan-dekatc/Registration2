import { Component, OnInit } from '@angular/core';
import { NotificationType, Notification, NotificationService } from 'src/app/services/notification.service';
import { Validators, FormGroup, FormControl, ValidatorFn, FormBuilder } from '@angular/forms';
import {Studentaddmision}from 'src/app/models/studentaddmision';
import { ToastrService } from 'ngx-toastr';

import { StudentaddmisionService } from 'src/app/services/api/studentaddmision.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  appToUpdate: Studentaddmision = null;
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
  }

  timelineStyle = {
    step0: { state: "current", open: true, failed: false },
    step1: { state: "not-started", open: false, failed: false },
    step2: { state: "not-started", open: false, failed: false },
    step3: { state: "not-started", open: false, failed: false },
    step4: { state: "not-started", open: false, failed: false },
  };

  public entryForm: FormGroup;
  submitted = false;
  constructor(
    private mainService: StudentaddmisionService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {


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
onSave(contactForm) {
  console.log("in save",contactForm.value);
 this.mainService.create(contactForm.value).subscribe(
   (data) => {
     console.log(data);
   },

 );
 if (contactForm.value) {
   this.toastr.success('Added successfully');

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
}
