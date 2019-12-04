import { Component, ViewEncapsulation } from '@angular/core';
import { GiftMessage } from '../../../app/danmaku.def';

@Component({
  selector: 'yt-live-chat-ticker-renderer',
  templateUrl: './gkd-ticker-renderer.component.html',
  styleUrls: ['./gkd-ticker-renderer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GkdTickerRendererComponent {

  danmakuList: GiftMessage[] = [];

  constructor() { }

  appendGift(gift: GiftMessage) {
    this.danmakuList = this.danmakuList.filter(x => {
      return x.tickerValid;
    })
    this.danmakuList.unshift(gift);
  }
}
