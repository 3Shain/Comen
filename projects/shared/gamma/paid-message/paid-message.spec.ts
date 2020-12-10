import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidMessage } from './paid-message';

describe('PaidMessage', () => {
  let component: PaidMessage;
  let fixture: ComponentFixture<PaidMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidMessage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
