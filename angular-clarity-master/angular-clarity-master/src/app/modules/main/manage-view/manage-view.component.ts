import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationType, Notification, NotificationService } from 'src/app/services/notification.service';
import { College } from 'src/app/models/college';
import { CollegeService } from './../../../services/api/college.service';
import { AlertService } from 'src/app/services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from './../../../services/excel.service';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-manage-view',
  templateUrl: './manage-view.component.html',
  styleUrls: ['./manage-view.component.scss']
})
export class ManageViewComponent implements OnInit {

  showAppCreation: boolean = false;
  deleteModal: boolean = false;
  selectedApp: College = null;
  rowSelected :any= {};

  modaldelete=false;
  loading = false;
  rows: any[];
  modalEdit = false;
  modalAdd= false;
  college;
  id:number;
  gridViewIsActive: boolean = true;
  public clrForm: FormGroup;
  @Input()
  apps: Array<College> = [];

  @Output()
  deletedApp: EventEmitter<string> = new EventEmitter();
  constructor(
    private notificationService: NotificationService,
    private mainService: CollegeService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private excel: ExcelService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.mainService.getAll().subscribe((data) => {
      console.log(data);
      this.college = data;
      this.college = data.collegeStudentEntity;

    });
  }
  openDeleteModal(luisApp: College) {
    this.selectedApp = luisApp;
    this.deleteModal = true;
  }

  deleteApp(appName: string) {
    this.mainService.deleteApp(appName).subscribe(result => {
      this.selectedApp = null;
      this.deletedApp.emit(appName);
      this.deleteModal = false;
    },
      err => {
        //TO:DO Display Notfication
      }
    )
  }

  showNotification(message: string, messageDetails: string) {
    this.notificationService.add(
      new Notification(
        NotificationType.Info,
        message,
        messageDetails
      )
    )
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
   onSave(contactForm) {
     console.log("in save",contactForm.value);
      this.modalAdd=false;
    this.mainService.create(contactForm.value).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();

      },

    );
    if (contactForm.value) {
      this.toastr.success('Added successfully');

    }
  }

  onExport() {
    this.excel.exportAsExcelFile(this.college, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd(row) {
    this.rowSelected = row;
this.modalAdd = true;

  }
}
