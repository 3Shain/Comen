import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockObsDialogComponent } from './mock-obs-dialog.component';

describe('MockObsDialogComponent', () => {
  let component: MockObsDialogComponent;
  let fixture: ComponentFixture<MockObsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockObsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockObsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
