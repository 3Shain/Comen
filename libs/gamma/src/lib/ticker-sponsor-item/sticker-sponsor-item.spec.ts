import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerSponsorItem } from './sticker-sponsor-item';

describe('StickerSponsorItem', () => {
  let component: StickerSponsorItem;
  let fixture: ComponentFixture<StickerSponsorItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerSponsorItem ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerSponsorItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
