import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothinglistComponent } from './clothinglist.component';

describe('ClothinglistComponent', () => {
  let component: ClothinglistComponent;
  let fixture: ComponentFixture<ClothinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
