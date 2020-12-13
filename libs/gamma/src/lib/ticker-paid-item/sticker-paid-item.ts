import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yt-live-chat-ticker-paid-message-item-renderer',
  templateUrl: './sticker-paid-item.html',
  styleUrls: ['./sticker-paid-item.scss'],
  host: {
    'class': "style-scope yt-live-chat-ticker-renderer",
    'role': "button",
    'style': "width: 92px; overflow: hidden;"
  }
})
export class StickerPaidItem implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
