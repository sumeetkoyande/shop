import { ProductService } from './../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { category } from 'src/app/models/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories$:Observable<category[]>;
  product$:any = {};

  //custome validators
  numberPattern = '^[0-9]*$';
  urlPattern = '^((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$';

  addProductForm = this.fb.group({
    title: ['',[Validators.required]],
    price: ['',[Validators.required,Validators.pattern(this.numberPattern)]],
    category: ['',[Validators.required]],
    description: ['',[Validators.required]],
    imageURL: ['',[Validators.required,Validators.pattern(this.urlPattern)]]
  })

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb:FormBuilder
    ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.productService.getOne(id).pipe(take(1)).subscribe(
        p => this.product$ = p
      );
      
    }

  }

  //get form controlls
  get f(){
    return this.addProductForm.controls;
  }

  check(){
    console.log(this.product$.title)
  }

  //add product
  addProduct(){
    if(this.addProductForm.valid){
      let productData = this.addProductForm.value;
      this.productService.create(productData);
      this.router.navigate(['admin/products']);
    }
  }

}

