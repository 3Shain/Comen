import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { GiftMessage } from '../../../app/danmaku.def';

@Component({
  selector: 'yt-live-chat-paid-message-renderer',
  templateUrl: './paid-message.component.html',
  styleUrls: ['./paid-message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LegacyPaidMessageComponent implements OnInit , AfterViewInit {

  @Input() item: GiftMessage;

  constructor() { }

  ngOnInit() {
  }

  get title() {
    if (this.item.guard_type > 0) {
      return `新的${this.item.gift}`;
    } else {
      return this.item.username;
    }
  }

  get subtitle() {
    if (this.item.guard_type > 0) {
      return `欢迎 ${this.item.username} 上舰`;
    } else {
      return `赠送 ${this.item.gift} ×${this.item.amount}`;
    }
  }

  ngAfterViewInit() {
    // if (!isPlatformBrowser(this.plat)) {
    //  return;
    // }
    // document.documentElement.scrollTop=document.documentElement.scrollHeight;
    window.scrollTo(0, document.documentElement.scrollHeight);
  }
}
