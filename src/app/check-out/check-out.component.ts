import { ShoppingCartItem } from './../models/shopping-cart-item.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  dataSource:MatTableDataSource<ShoppingCartItem[]>

  constructor() { }

  ngOnInit(): void {
  }

}
