import { Component, ViewEncapsulation, Input } from '@angular/core';
import { GiftMessage } from '../../../danmaku.def';
@Component({
  selector: 'yt-live-chat-ticker-paid-message-item-renderer',
  templateUrl: './gkd-ticker.component.html',
  styleUrls: ['./gkd-ticker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GkdTickerComponent {

  @Input() item: GiftMessage;

  get progress(): number {
    if (Date.now() > this.item.tickerExpire) {
      this.valid = false;
      return 0;
    }
    return (Date.now() - this.item.tickerStart) / (this.item.tickerTime);
  }

  valid: boolean = true;

  get progressStyle(): any {
    return {
      'background': `linear-gradient(90deg, ${this.item.color_theme.color_secondary},${this.item.color_theme.color_secondary} ${this.progress * 100 + '%'},${this.item.color_theme.color_primary} ${this.progress * 100 + '%'},${this.item.color_theme.color_primary})`
    }
  }

  get contentStyle(): any {
    return {
      'color': this.item.color_theme.color_header
    }
  }

  get text(): string {
    if (this.item.superchat) {
      return `CN¥${this.item.value}`;
    } else if (this.item.guard_type > 0) {
      return this.item.gift;
    }
    else {
      return `${this.item.gift} ×${this.item.amount}`
    }
  }

  constructor() { }
}
