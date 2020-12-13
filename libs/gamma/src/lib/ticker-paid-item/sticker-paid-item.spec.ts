import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerPaidItem } from './sticker-paid-item';

describe('StickerPaidItem', () => {
  let component: StickerPaidItem;
  let fixture: ComponentFixture<StickerPaidItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerPaidItem ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerPaidItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
