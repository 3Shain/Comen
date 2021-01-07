import { Component, Input } from '@angular/core';
import { TextMessage } from '../message';

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-text-message-renderer',
  templateUrl: './text-message.html',
  // eslint-disable-next-line
  host: {
    class: 'style-scope yt-live-chat-item-list-renderer',
    'author-type': 'member' // todo: type!
  }
})
// eslint-disable-next-line
export class TextMessageRenderer {

  @Input() message: TextMessage;

  readonly date = new Date();

  get isMember() {
    return (this.message.usertype & 1) === 1;
  }

  get isModerator() {
    return (this.message.usertype & 2) === 2;
  }
}
