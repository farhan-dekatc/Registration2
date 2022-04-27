import { Component, OnInit } from '@angular/core';
import { CollegeService } from './../../../services/api/college.service';
import { College } from 'src/app/models/college';
import { NotificationService, NotificationType, Notification } from 'src/app/services/notification.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})

export class CollegeComponent implements OnInit {

  gridViewIsActive: boolean = true;


  apps: Array<College> = [];


  constructor(

    private mainService: CollegeService,
    private notificationService: NotificationService,

  ) { }

  ngOnInit(): void {

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


}
