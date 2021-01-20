import { Component, Input, ViewEncapsulation } from '@angular/core';
import { GammaConfigService } from '../gamma-config.service';
import { StickerMessage } from '@comen/common';

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-paid-sticker-renderer',
  templateUrl: './paid-sticker.html',
  // eslint-disable-next-line
  host: {
    class: 'style-scope yt-live-chat-item-list-renderer',
    '[style]': 'colorStyle'
  },
  encapsulation: ViewEncapsulation.None
})
// eslint-disable-next-line
export class PaidStickerRenderer {

  @Input() message: StickerMessage;

  constructor(private config: GammaConfigService) { }

  get colorInfo() {
    return this.config.getColorInfo(this.message.price);
  }

  get colorStyle() {
    return `--yt-live-chat-paid-sticker-chip-background-color: ${this.colorInfo.primary};
    --yt-live-chat-paid-sticker-chip-text-color: ${this.colorInfo.message};
    --yt-live-chat-paid-sticker-background-color: ${this.colorInfo.secondary};
    --yt-live-chat-paid-sticker-author-name-text-color: ${this.colorInfo.authorName};`;
  }

  readonly date = new Date();
}
