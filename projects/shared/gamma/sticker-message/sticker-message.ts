import { Component, ElementRef, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'yt-live-chat-paid-sticker-renderer',
  templateUrl: './sticker-message.html',
  styleUrls: ['./sticker-message.scss'],
  host:{
    'class':'style-scope yt-live-chat-item-list-renderer',
    'style':'--yt-live-chat-paid-sticker-chip-background-color:rgba(0,229,255,1); --yt-live-chat-paid-sticker-chip-text-color:rgba(0,0,0,1); --yt-live-chat-paid-sticker-background-color:rgba(0,184,212,1); --yt-live-chat-paid-sticker-author-name-text-color:rgba(0,0,0,0.701961);'
  },
  encapsulation: ViewEncapsulation.None
})
export class StickerMessage implements OnInit {

  @Output('initialSize') initialSize = new EventEmitter<number>(false);

  constructor(private elementRef:ElementRef<HTMLElement>) {
    const obs = new ResizeObserver(entry=>{
      this.initialSize.next(entry[0].borderBoxSize[0].blockSize);
      this.initialSize.complete();
      obs.disconnect();
    });
    obs.observe(elementRef.nativeElement);
  }

  ngOnInit(): void {
  }

}
