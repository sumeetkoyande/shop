import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from 'src/app/models/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories$:Observable<category[]>;
  product$ = <Product>{};
  id;

  //custome validators
  numberPattern = '^[0-9]*$';
  urlPattern = '^((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$';

  addProductForm = this.fb.group({
    title: [ this.product$.title, [ Validators.required ] ],
    price: [ this.product$.price, [ Validators.required, Validators.pattern(this.numberPattern) ] ],
    category: [ this.product$.category, [ Validators.required ] ],
    description: [ this.product$.description, [ Validators.required ] ],
    imageURL: [ this.product$.imageURL, [ Validators.required, Validators.pattern(this.urlPattern) ] ]
  })

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb:FormBuilder
    ) { 
      this.categories$ = this.categoryService.getCategories();
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id){
        this.productService.getOne(this.id).pipe(take(1)).subscribe(
          p => { 
            this.product$ = p;
            this.setAddProductFormValue(this.product$)
           }
        )
      }
    }

  ngOnInit() {

  }

  //get form controlls
  get f(){
    return this.addProductForm.controls;
  }

  get formValue(){
    return this.addProductForm.value;
  }

  setAddProductFormValue(product:Product){
    const { title,price,category,description,imageURL } = product
    this.addProductForm.setValue({
      title, price, category, description, imageURL
    })
  }

  //add and update product
  save(){
    if(this.addProductForm.valid){
      if(this.id) this.productService.update(this.id,this.formValue);
      else this.productService.create(this.formValue);

      this.router.navigate(['admin/products']);
    }
  }


}

