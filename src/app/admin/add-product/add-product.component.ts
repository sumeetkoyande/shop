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

  //custome validators
  numberPattern = '^[0-9]*$';
  urlPattern = '^((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$';

  addProductForm = this.fb.group({
    title: ['',[Validators.required]],
    price: ['',[Validators.required,Validators.pattern(this.numberPattern)]],
    category: ['',[Validators.required]],
    imageURL: ['',[Validators.required,Validators.pattern(this.urlPattern)]]
  })

  constructor(
    private categoryService: CategoryService,
    private fb:FormBuilder
    ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

  //get form controlls
  get f(){
    return this.addProductForm.controls;
  }

  //add product
  addProduct(){
    if (this.addProductForm.valid){
      console.log(this.addProductForm.value)
    }
      
   
  }

}

