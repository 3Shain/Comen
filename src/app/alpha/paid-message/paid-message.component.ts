import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { GiftMessage } from '../../../app/danmaku.def';
import { isNgTemplate } from '@angular/compiler';

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

  get title(){
    if(this.item.guard_type>0){
      return `新的${this.item.gift}`;
    }
    else{
      return this.item.username;
    }
  }

  get subtitle(){
    if(this.item.guard_type>0){
      return `欢迎 ${this.item.username} 上舰`;
    }
    else{
      return `赠送 ${this.item.gift} ×${this.item.amount}`;
    }
  }

  getColor() {
    // 这段代码过于真实
    if (this.item.value >= 1245) {
      return '#e62117';
    } else if (this.item.value >= 450) {
      return '#c2185b';
    } else if (this.item.value >= 300) {
      return '#e65100';
    } else if (this.item.value >= 100) {
      return '#ffca28';
    } else if (this.item.value >= 50) {
      return '#00bfa5'; // 100
    } else {
      return '#00b8d4'; // 50
    }
  }
  ngAfterViewInit(){
    //if (!isPlatformBrowser(this.plat)) {
    //  return;
    //}
    //document.documentElement.scrollTop=document.documentElement.scrollHeight;
    window.scrollTo(0, document.documentElement.scrollHeight);
  }
}
