import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextMessage } from '../message';

@Component({
  selector: 'yt-live-chat-text-message-renderer',
  templateUrl: './text-message.html',
  styleUrls: ['./text-message.scss'],
  host: {
    class: "style-scope yt-live-chat-item-list-renderer",
    'author-type': "member" // todo: type!
  }
})
export class TextMessageComponent implements OnInit {

  @Input('message') message: TextMessage;
  @Output('initialSize') initialSize = new EventEmitter<number>(false);

  constructor(private elementRef:ElementRef<HTMLElement>) {
    const obs = new ResizeObserver(entry=>{
      this.initialSize.next(entry[0].contentRect.height);
      this.initialSize.complete();
      obs.disconnect();
    });
    obs.observe(elementRef.nativeElement);
  }

  ngOnInit(): void {
  }

  readonly date = new Date();

}
