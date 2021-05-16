import { category } from './../../models/category.model';
import { CategoryService } from './../../services/category.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$:Observable<category[]>

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll()
  }

}
