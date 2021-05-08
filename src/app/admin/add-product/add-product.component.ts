import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from 'src/app/models/category.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories$:Observable<category[]>;
  addProductForm = this.fb.group({
    title: ['',[Validators.required]],
    price: ['',[Validators.required]],
    category: ['',[Validators.required]],
    ImageURL: ['',[Validators.required]]
  })

  constructor(
    private categoryService: CategoryService,
    private fb:FormBuilder
    ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

  addProduct(){
   
  }

}

