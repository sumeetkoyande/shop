import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityUpdateComponent } from './product-quantity-update.component';

describe('ProductQuantityUpdateComponent', () => {
  let component: ProductQuantityUpdateComponent;
  let fixture: ComponentFixture<ProductQuantityUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductQuantityUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuantityUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
