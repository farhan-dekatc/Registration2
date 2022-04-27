import { Component, Input, OnInit } from '@angular/core';
import { NotificationType, Notification, NotificationService } from 'src/app/services/notification.service';
import { College } from 'src/app/models/college';
import { CollegeService } from 'src/app/services/api/college.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
  rowSelected :any= {};
  modalAdd= false;
  @Input()
  apps: Array<College> = [];
college;
  constructor(private notificationService: NotificationService,
    private mainService: CollegeService,
    private toastr: ToastrService,) { }

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
  showNotification(message: string, messageDetails: string) {
    this.notificationService.add(
      new Notification(
        NotificationType.Info,
        message,
        messageDetails
      )
    )
  }
  goToAdd(row) {
    this.rowSelected = row;
this.modalAdd = true;

  }
  onSave(contactForm) {
    console.log("in save",contactForm.value);
     this.modalAdd=false;
   this.mainService.create(contactForm.value).subscribe(
     (data) => {
       console.log(data);

     },

   );
   if (contactForm.value) {
     this.toastr.success('Added successfully');

   }
 }
}
