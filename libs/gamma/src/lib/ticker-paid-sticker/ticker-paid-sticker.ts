import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SLIDEDOWN } from '../animations';
import { StickerMessage } from '@comen/common';

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-ticker-paid-sticker-item-renderer',
  templateUrl: './ticker-paid-sticker.html',
  // eslint-disable-next-line
  host: {
    class: 'style-scope yt-live-chat-ticker-renderer',
    role: 'botton',
    '[@slideDown]':''
  },
  animations:[
    SLIDEDOWN
  ]
})
// eslint-disable-next-line
export class TickerPaidStickerItemRenderer {

  @Input() message: StickerMessage;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;

  @Input() set status(
    val: {
      primary_color: string; 
      secondary_color: string;
      percent: number
    }
  ) {
    this.container?.nativeElement?.setAttribute('style', `background:linear-gradient(90deg, ${val.primary_color},${val.primary_color}` +
      ` ${(1 - val.percent) * 100}%,${val.secondary_color} ${(1 - val.percent) * 100}%,${val.secondary_color});`);
  }
}
