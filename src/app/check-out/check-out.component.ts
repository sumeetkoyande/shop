import { FormBuilder, Validators } from '@angular/forms';
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

  shippingForm = this.fb.group({
    firstName: ['', [Validators.required] ],
    lastName: ['', [Validators.required] ],
    AddressLine_1: ['', [Validators.required] ],
    AddressLine_2: ['', [Validators.required] ],
    state: ['', [Validators.required] ],
    city: ['', [Validators.required] ],
    pincode: ['', [Validators.required, Validators.maxLength(6)] ],
    phone: ['', [Validators.required,Validators.maxLength(10)] ],
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

}
