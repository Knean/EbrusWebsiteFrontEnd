import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialorderComponent } from './specialorder.component';

describe('SpecialorderComponent', () => {
  let component: SpecialorderComponent;
  let fixture: ComponentFixture<SpecialorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
