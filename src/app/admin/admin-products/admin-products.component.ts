import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  products:Product[];
  productSubcription:Subscription;

  //for material table
  displayedColumns: string[] = ['title','price','edit'];
  dataSource:MatTableDataSource<Product>

  @ViewChild('paginator') paginator:MatPaginator;

  constructor(private productService:ProductService) { }

  ngOnInit(){
    // To get data for table
    this.productSubcription = this.productService.getAll()
      .subscribe(p => { 
        this.products = p;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator
      });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.productSubcription.unsubscribe()
  }
}
