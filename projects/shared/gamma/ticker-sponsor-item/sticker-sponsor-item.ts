import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yt-live-chat-ticker-sponsor-item-renderer',
  templateUrl: './sticker-sponsor-item.html',
  styleUrls: ['./sticker-sponsor-item.scss'],
  host:{
    'class':'style-scope yt-live-chat-ticker-renderer',
    'role':'button'
  }
})
export class StickerSponsorItem implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
