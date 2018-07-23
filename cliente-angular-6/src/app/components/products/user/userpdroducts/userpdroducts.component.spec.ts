import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpdroductsComponent } from './userpdroducts.component';

describe('UserpdroductsComponent', () => {
  let component: UserpdroductsComponent;
  let fixture: ComponentFixture<UserpdroductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpdroductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpdroductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
