import { Component, OnInit , TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rn_Fb_Header } from 'src/app/models/Rn_Fb_Header';
import { AlertService } from 'src/app/services/alert.service';
import { ModulesetupService } from 'src/app/services/api/modulesetup.service';
import { WireframeService } from 'src/app/services/api/wireframe.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-allwireframe',
  templateUrl: './allwireframe.component.html',
  styleUrls: ['./allwireframe.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AllwireframeComponent implements OnInit {

  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  moduleId: number;
  wireFrames: Rn_Fb_Header[];

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private excel: ExcelService,
    private moduleService: ModulesetupService,
    private wireframeService: WireframeService,
    private alertService: AlertService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.moduleId = this.wireframeService.getModuleId(); // get from session storage
    console.log(this.moduleId);

    this.getModuleWireframes(this.moduleId);
  }
  getModuleWireframes(id: number) {
    this.isLoading = true;
    //this.moduleService.getById(id).subscribe((data) => {
      this.wireframeService.getAll(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      //this.wireFrames = data.rn_fb_headers;
      this.wireFrames = data.items;
      console.log('wireframes: ', this.wireFrames);
      this.rows = this.wireFrames;
      this.temp = [...this.wireFrames];
    });
  }
  goToAdd() {
    //this.router.navigate(["../add"], { relativeTo: this.route });
    this.router.navigate(["../types"], { relativeTo: this.route });
    //this.router.navigate(["../edit/:id/properties"], { relativeTo: this.route });

  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.rows, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.wireframeService.deleteField(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
    );


  }
}
