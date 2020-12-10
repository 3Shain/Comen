import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerMessage } from './sticker-message';

describe('StickerMessage', () => {
  let component: StickerMessage;
  let fixture: ComponentFixture<StickerMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerMessage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
