import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from 'src/app/services/api/university.service';


interface errorMsg {
  field: any;
  message: any;
}
@Component({
  selector: 'app-adduniversity1',
  templateUrl: './adduniversity1.component.html',
  styleUrls: ['./adduniversity1.component.scss']
})
export class Adduniversity1Component implements OnInit {
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
  public entryForm: FormGroup;
  submitted = false;
  errorMsg: errorMsg[] = [];
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private universityservice:UniversityService,
  ) { }

  ngOnInit(): void {
    this.universityservice.getAll().subscribe((data)=>{
      console.log(data)
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

    this.universityservice.create(this.entryForm.value).subscribe(data => {
      console.log(data)
      this.router.navigate(["../../university1/all"], { relativeTo: this.route });

    },
      (error) => {
        console.log(error);
      }
    );
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



}
