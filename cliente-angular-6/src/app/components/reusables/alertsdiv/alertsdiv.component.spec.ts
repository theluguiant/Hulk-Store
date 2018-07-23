import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsdivComponent } from './alertsdiv.component';

describe('AlertsdivComponent', () => {
  let component: AlertsdivComponent;
  let fixture: ComponentFixture<AlertsdivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsdivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
