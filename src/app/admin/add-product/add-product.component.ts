import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories$:Observable<any>;
  constructor(private categoryService: CategoryService) { 
    this.categories$ = this.categoryService.getCategories();
    
  }

  ngOnInit() {
    
  }

  addProduct(){
   
  }

}

