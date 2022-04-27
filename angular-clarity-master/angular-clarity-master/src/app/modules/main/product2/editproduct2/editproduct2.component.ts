import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { product } from "src/app/models/product";
import { ValidationError } from "src/app/models/ValidationError";
import { ProductService} from "src/app/services/api/product.service";
@Component({
  selector: 'app-editproduct2',
  templateUrl: './editproduct2.component.html',
  styleUrls: ['./editproduct2.component.scss']
})
export class Editproduct2Component implements OnInit {

  updated = false;
  product: product;
  id: number;

  errorFields: ValidationError[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService:ProductService,
  ) { }

  ngOnInit(): void {
    this.product = new product();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.productService.getById(id).subscribe(
      (data) => {
        this.product = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    this.productService.update(this.id, this.product).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
      },

    );
    this.product = new product();
  }
  onSubmit() {
    this.updated = true;
    this.update();
  }
  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
