import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from 'src/app/services/api/university.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { university } from 'src/app/models/university';

@Component({
  selector: 'app-edituniversity1',
  templateUrl: './edituniversity1.component.html',
  styleUrls: ['./edituniversity1.component.scss']
})
export class Edituniversity1Component implements OnInit {
  name=['ashwini'];

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



  updated = false;
  university;
  id: number;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private uniservice:UniversityService,
  ) { }

  ngOnInit(): void {
    this.university=new university();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.uniservice.getAll().subscribe((data)=>{
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
    getById(id: number) {
      this.uniservice.getById(id).subscribe((data) => {
        this.university = data;
        console.log("data",this.university);
        //console.log(data.book)


        //this.students = data.students;

      });
    }

      update() {
        this.uniservice.update(this.id, this.university).subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(["../../all"], { relativeTo: this.route });

          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        );
      }

      onSubmit() {
        this.updated = true;
        this.update();
      }


}
