import { Observable } from 'rxjs';
import { category } from './../models/category.model';
import { ProductService } from './../services/product.service';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  category$:Observable<category[]>;
  products$:Product

  constructor(
    private categoryService:CategoryService, 
    private productService:ProductService
    ) { }

  ngOnInit() {
    this.category$ = this.categoryService.getAll();

  }

}
