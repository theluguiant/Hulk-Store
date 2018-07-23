import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsadminaddComponent } from './productsadminadd.component';

describe('ProductsadminaddComponent', () => {
  let component: ProductsadminaddComponent;
  let fixture: ComponentFixture<ProductsadminaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsadminaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsadminaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
