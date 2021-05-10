import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productData$;
  displayedColumns: string[] = ['title','category','description','edit'];

  constructor(private productService:ProductService) { }

  ngOnInit(){
    this.productData$ = this.productService.getAll();
  }

  
  
}
