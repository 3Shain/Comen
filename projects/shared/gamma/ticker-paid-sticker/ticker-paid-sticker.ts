import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yt-live-chat-ticker-paid-sticker-item-renderer',
  templateUrl: './ticker-paid-sticker.html',
  styleUrls: ['./ticker-paid-sticker.scss'],
  host: {
    'class':'style-scope yt-live-chat-ticker-renderer',
    'role':'botton'
  }
})
export class TickerPaidSticker implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
