import { Component, Input } from '@angular/core';
import { MemberMessage } from '../message';

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-membership-item-renderer',
  templateUrl: './membership-item.html',
  // eslint-disable-next-line
  host: {
    class: 'style-scope yt-live-chat-item-list-renderer',
    'show-only-header': ''
  }
})
// eslint-disable-next-line
export class MembershipItemRenderer {

  @Input() message: MemberMessage;

  readonly date = new Date();
}
