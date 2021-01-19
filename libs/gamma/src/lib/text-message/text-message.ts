import { Component, Input } from '@angular/core';
import { GammaConfigService } from '../gamma-config.service';
import { TextMessage } from '../message';

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-text-message-renderer',
  templateUrl: './text-message.html',
  // eslint-disable-next-line
  host: {
    class: 'style-scope yt-live-chat-item-list-renderer',
    '[attr.author-type]': 'userType'
  }
})
// eslint-disable-next-line
export class TextMessageRenderer {

  @Input() message: TextMessage;

  readonly date = new Date();

  constructor(public config:GammaConfigService) {}

  get userType(){
    if(this.isOwner){
      return 'owner';
    }
    else if(this.isModerator){
      return 'moderator';
    }
    else if(this.isMember){
      return 'member';
    } else{
      return '';
    }
  }

  get isMember() {
    return (this.message.usertype & 1) === 1;
  }

  get isModerator() {
    return (this.message.usertype & 2) === 2;
  }

  get isOwner() {
    return (this.message.usertype & 4) === 4;
  }
}
