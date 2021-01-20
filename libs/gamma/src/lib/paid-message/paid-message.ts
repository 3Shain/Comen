import { Component, Input } from '@angular/core';
import { GammaConfigService } from '../gamma-config.service';
import { PaidMessage } from '@comen/common';

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-paid-message-renderer',
  templateUrl: './paid-message.html',
  // eslint-disable-next-line
  host: {
    class: 'style-scope yt-live-chat-item-list-renderer',
    'allow-animations': '',
    '[style]': 'colorStyle',
    '[attr.show-only-header]': '(message.content==\'\'||!message.content)?\'\':null' // TO BE CHECKED
  }
})
// eslint-disable-next-line
export class PaidMessageRenderer {

  @Input() message: PaidMessage;

  constructor(private config: GammaConfigService) {
  }

  get colorStyle() {
    const color = this.config.getColorInfo(this.message.price);
    return `
    --yt-live-chat-paid-message-primary-color: ${color.primary};
    --yt-live-chat-paid-message-secondary-color: ${color.secondary};
    --yt-live-chat-paid-message-header-color: ${color.header};
    --yt-live-chat-paid-message-author-name-color: ${color.authorName};
    --yt-live-chat-paid-message-timestamp-color: ${color.timestamp};
    --yt-live-chat-paid-message-color: ${color.message};
    `;
  }

  readonly date = new Date();
}
