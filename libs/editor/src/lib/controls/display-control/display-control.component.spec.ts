import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayControlComponent } from './display-control.component';

describe('DisplayControlComponent', () => {
  let component: DisplayControlComponent;
  let fixture: ComponentFixture<DisplayControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
