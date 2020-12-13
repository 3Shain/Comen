import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipMessage } from './membership-message';

describe('MembershipMessage', () => {
  let component: MembershipMessage;
  let fixture: ComponentFixture<MembershipMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipMessage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
