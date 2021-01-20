import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SLIDEDOWN } from '../animations';
import { PaidMessage } from '@comen/common';

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-ticker-paid-message-item-renderer',
  templateUrl: './ticker-paid-item.html',
  // eslint-disable-next-line
  host: {
    class: 'style-scope yt-live-chat-ticker-renderer',
    role: 'button',
    style: 'overflow: hidden;',
    '[@slideDown]':''
  },
  animations:[
    SLIDEDOWN
  ]
})
// eslint-disable-next-line
export class TickerPaidMessageItemRenderer {

  @Input() message: PaidMessage;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;

  @Input() set status(
    val: {
      primary_color: string;
      secondary_color: string;
      text_color: string;
      percent: number
    }
  ) {
    this.container?.nativeElement?.setAttribute('style', `background:linear-gradient(90deg, ${val.primary_color},${val.primary_color}` +
      ` ${(1 - val.percent) * 100}%,${val.secondary_color} ${(1 - val.percent) * 100}%,${val.secondary_color});`);
    this.container?.nativeElement?.firstElementChild.setAttribute('style', `color: ${val.text_color}`)
  }
}
