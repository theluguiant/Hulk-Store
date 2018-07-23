import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductadminlistComponent } from './productadminlist.component';

describe('ProductadminlistComponent', () => {
  let component: ProductadminlistComponent;
  let fixture: ComponentFixture<ProductadminlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductadminlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductadminlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
