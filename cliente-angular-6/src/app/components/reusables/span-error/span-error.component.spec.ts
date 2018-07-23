import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanErrorComponent } from './span-error.component';

describe('SpanErrorComponent', () => {
  let component: SpanErrorComponent;
  let fixture: ComponentFixture<SpanErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpanErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpanErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
