import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductadmineditComponent } from './productadminedit.component';

describe('ProductadmineditComponent', () => {
  let component: ProductadmineditComponent;
  let fixture: ComponentFixture<ProductadmineditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductadmineditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductadmineditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
