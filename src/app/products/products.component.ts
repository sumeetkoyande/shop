import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product.model';
import { Observable } from 'rxjs';
import { category } from './../models/category.model';
import { ProductService } from './../services/product.service';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories$:Observable<category[]>;
  category:string;
  products:Product[] = [];
  filteredProducts:Product[]=[]

  constructor(
    private route: ActivatedRoute,
    private categoryService:CategoryService, 
    private productService:ProductService
    ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.productService.getAll().subscribe( p => this.filteredProducts = this.products = p);

    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category')

      this.filteredProducts = (this.category) ? 
        this.products.filter(p => p.category === this.category ) : this.products;
    })
  }

}
