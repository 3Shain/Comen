import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderControlComponent } from './border-control.component';

describe('BorderControlComponent', () => {
  let component: BorderControlComponent;
  let fixture: ComponentFixture<BorderControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorderControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
