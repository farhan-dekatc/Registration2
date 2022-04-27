import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/api/user-registration.service';

@Component({
  selector: 'app-selfregistration',
  templateUrl: './selfregistration.component.html',
  styleUrls: ['./selfregistration.component.scss']
})
export class SelfregistrationComponent implements OnInit {
  email: string;

  constructor(
    private userRegistrationService: UserRegistrationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.email = this.userRegistrationService.getStoredEmail();

  }
  goAddEmail() {
    this.router.navigate(["/create-account"]);
  }
}
