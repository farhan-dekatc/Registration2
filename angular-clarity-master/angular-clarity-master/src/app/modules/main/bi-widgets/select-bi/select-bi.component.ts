import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-bi',
  templateUrl: './select-bi.component.html',
  styleUrls: ['./select-bi.component.scss']
})
export class SelectBiComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  goToWidget() {
    //this.router.navigate(["../add"], { relativeTo: this.route });
    this.router.navigate(["../bi-widgets"], { relativeTo: this.route });
  }
  goToDash(){

}
}
