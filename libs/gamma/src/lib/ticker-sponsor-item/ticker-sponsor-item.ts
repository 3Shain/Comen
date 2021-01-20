import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SLIDEDOWN } from '../animations';
import { MemberMessage } from '@comen/common';

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-ticker-sponsor-item-renderer',
  templateUrl: './ticker-sponsor-item.html',
  // eslint-disable-next-line
  host: {
    class: 'style-scope yt-live-chat-ticker-renderer',
    role: 'button',
    '[@slideDown]':''
  },
  animations:[
    SLIDEDOWN
  ]
})
// eslint-disable-next-line
export class TickerSponsorItemRenderer {

  @Input() message: MemberMessage;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;

  @Input() set status(
    val: {
      primary_color: string; // not used
      secondary_color: string; // not used
      percent: number
    }
  ) {
    this.container?.nativeElement?.setAttribute('style', `background:linear-gradient(90deg, rgba(15,157,88,1),rgba(15,157,88,1)` +
      ` ${(1 - val.percent) * 100}%,rgba(11,128,67,1) ${(1 - val.percent)* 100}%,rgba(11,128,67,1));`);
  }

}
