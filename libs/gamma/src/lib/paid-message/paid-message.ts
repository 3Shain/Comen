import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'yt-live-chat-paid-message-renderer',
  templateUrl: './paid-message.html',
  styleUrls: ['./paid-message.scss'],
  host:{
    'class':'style-scope yt-live-chat-item-list-renderer',
    'allow-animations':''
  }
})
export class PaidMessage implements OnInit {

  
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
