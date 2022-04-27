import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ProductService} from 'src/app/services/api/product.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addproduct2',
  templateUrl: './addproduct2.component.html',
  styleUrls: ['./addproduct2.component.scss']
})
export class Addproduct2Component implements OnInit {

  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;

product:FormArray;
  constructor(
    private productService: ProductService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      product: this._fb.array([this.initLinesForm()]),
    });
  }
  initLinesForm() {
    return this._fb.group({
      productname: [null],
      quantity: [null],
      date: [null],
      phone: [null],
      price:[null]
    })
  }


  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }
  onCreate() {
    this.productService.create(this.entryForm.getRawValue()['product']).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../product2/all"], { relativeTo: this.route });
      },

    );

  }
  get controls() {
    return (this.entryForm.get("product") as FormArray).controls;
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("product")).removeAt(index);
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("product")).push(this.initLinesForm());
  }
}
