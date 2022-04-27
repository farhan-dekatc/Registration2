import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Rn_Fb_Header } from "src/app/models/Rn_Fb_Header";
import { WireFrame } from "src/app/models/WireFrame";
import { WireframeService } from "src/app/services/api/wireframe.service";
@Component({
  selector: 'app-editwireframe',
  templateUrl: './editwireframe.component.html',
  styleUrls: ['./editwireframe.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class EditwireframeComponent implements OnInit {

  public exportDataForm: FormGroup;
  public addButtonOrSectionForm: FormGroup;
  submited = false;
  typeSubmited = false;
  updated = false;
  fbHeader: Rn_Fb_Header;
  //uiData: Section[];
  uiData: WireFrame = {} as WireFrame;
  id: number; // rn_fb_header id
  formType: string;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private wireFrameService: WireframeService,
    private ref: ChangeDetectorRef
  ) { }
  types: any[]  = ['section', 'button'];
  editMode: string[] = ['basic', 'additional','edit_section','edit_button'];
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]; // fb_header_id
    this.getById(this.id);
    this.getUIData(this.id);
    // export table with data form
    this.exportDataForm = this._fb.group({
      data: [null]
    });
    // add button or section form
    this.addButtonOrSectionForm = this._fb.group({
      type: [this.types[0]]
    });
  }
  getById(id: number) {
    this.wireFrameService.getById(id).subscribe(
      (data) => {
        //console.log(data);
        this.fbHeader = data;
        this.formType = data.formType;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUIData(id: number) {
    console.log("get line by header id",id);

    this.wireFrameService.getLinesByHeaderId(id).subscribe(res => {
      this.uiData = res;
      console.log(this.uiData);
    }, (err) => {
      console.log(err);
    });
  }

  // ----- call this two method in subscribe if changes -------
  // this.getById(this.id);
  // this.ref.detectChanges();

  // ============ LINES MANIPULATION

  // need modification
  editSection(id: number,editmode:string) {
    // CHANGE THE SECTION NAME
    // API : POST:  wireframe-update-field-name/{id}
    // updateFieldName(id: number, body: Rn_Fb_Lines);
    console.log("editField() id: ", id);
    console.log(editmode);

    this.router.navigate(["properties"], { relativeTo: this.route, queryParams: {id: id, mode: editmode} });
    //this.wireFrameService.updateFieldName(id);
  }


  addButtonOrSection() {
    // CHANGE THE SECTION NAME
    // API : POST:  api/wireframe-add-section-button/{id}
    // addSectionOrButton(id: number, body: any);
    console.log(this.addButtonOrSectionForm.value);
    this.typeSubmited = true;
    if (this.addButtonOrSectionForm.invalid) {
      console.log("uunder incvalid form");

      return;
    }
    console.log("after invalid check and befor api call",this.addButtonOrSectionForm.value,"fb header id",this.id);
    this.wireFrameService
      .addSectionOrButton(this.id, this.addButtonOrSectionForm.value)
      .subscribe(
        (res) => {
          console.log("under api call");

          console.log(res);
          //this.getUIData(this.id);
          this.ref.detectChanges();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteSection(section_num: number) {
    // API : GET: wireframe-delete-section/{section_num}, header_id
    // deleteSection(section_num, this.id)
    console.log("deleteSection() section_num: ", section_num, this.id);
    this.wireFrameService.deleteSection(this.id, section_num).subscribe(res => {
      console.log(res);
      this.getUIData(this.id);
      this.ref.detectChanges();
    }, (err) => {
      console.log(err);
    });
  }

  addFieldInSection(id: number, section_num: number) {
    console.log("addFieldInSection() id:", id, ", section_num: ", section_num);
    this.wireFrameService.addFieldInSection(id, section_num).subscribe(res => {
      console.log(res);
      this.getUIData(this.id);
      this.ref.detectChanges();
    }, (err) => {
      console.log(err);
    });
  }

  // not working. need testing
  addFieldInLineSection(id: number, section_num: number) {
    console.log("addFieldInLineSection() id:", id, ", section_num: ", section_num);
    this.wireFrameService.addFieldInLineSection(id, section_num).subscribe(res => {
      console.log(res);
      this.getUIData(this.id);
      this.ref.detectChanges();
    }, (err) => {
      console.log(err);
    });

  }

  // this will redirect to another page
  fieldPropertyUpdate(id: number, editmode: string) {
    console.log("field update mode "+ editmode)
    this.router.navigate(["properties"], { relativeTo: this.route, queryParams: {id: id, mode: editmode} });
  }


  buttonupdate(id,editmode)
  {
    console.log(id  +"  " + editmode);

    this.router.navigate(["properties"],{relativeTo:this.route,queryParams:{id:id,mode:editmode}});


  }

/*   fieldPropertyUpdate(id: number) {
    console.log("PropertyUpdate(): id: ", id);
    this.router.navigate(["properties"], { relativeTo: this.route, queryParams: {id: id} });
  } */

  deleteField(id: number) {
    console.log("deleteField(): id: ", id);
    this.wireFrameService.deleteField(id).subscribe(res => {
      console.log(res);
      this.getUIData(this.id);
      this.ref.detectChanges();
    }, (err) => {
      console.log(err);
    });
  }



  // ============================

  onCreateTable() {
    console.log("Id::",this.id,"form type::",this.formType);
    console.log("create table calling",this.exportDataForm.value);
    this.submited = true;
    if (this.exportDataForm.invalid) {
      return;
    }
    this.wireFrameService
      .createTable(this.id, this.formType, this.exportDataForm.value)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  buildForm() {
    this.wireFrameService.buildMVCForm(this.formType, this.id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  buildAngularForm() {
    this.wireFrameService.buildAngularForm(this.id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  buildDynamicForm() {
    let techStack = this.fbHeader.techStack;
    let objectType = this.fbHeader.objectType;
    let subObjectType = this.fbHeader.subObjectType;
    var re = /-/gi;
    var str = "Spring-mvc";
    var newstr = str.replace(re, "_");
    console.log("id ",this.id);

    console.log("new string::",newstr);

    console.log("tech stack::",techStack);

    let actionLink =
      techStack + "_" + objectType + "_" + subObjectType + "_Builder";
    actionLink = actionLink.replace(" ", "_");
    actionLink = actionLink.replace(re, "_");
    console.log("tech stack after::",actionLink);
    console.log("Dynamic Builder Action Link : ", actionLink);

    this.wireFrameService.dynamicBuilder(this.id, actionLink).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  uinameedit(id:number)
  {
    console.log("uinameedit() id: ", id);
    this.router.navigate(["uinameedit"], { relativeTo: this.route, queryParams: {id: id} });
  }
}
