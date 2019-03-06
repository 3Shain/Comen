import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { GiftMessage } from '../../../app/danmaku.def';

@Component({
  selector: 'yt-live-chat-paid-message-renderer',
  templateUrl: './paid-message.component.html',
  styleUrls: ['./paid-message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LegacyPaidMessageComponent implements OnInit {

  @Input() item: GiftMessage;

  constructor() { }

  ngOnInit() {
  }

  getColor() {
    // 这段代码过于真实
    if (this.item.value >= 1245) {
      return '#e62117';
    } else if (this.item.value >= 450) {
      return '#c2185b';
    } else if (this.item.value >= 300) {
      return '#e65100';
    } else if (this.item.value >= 200) {
      return '#ffca28';
    } else if (this.item.value >= 100) {
      return '#00bfa5'; // 100
    } else {
      return '#00b8d4'; // 50
    }
  }
}
