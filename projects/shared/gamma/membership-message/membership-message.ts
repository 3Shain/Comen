import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'yt-live-chat-membership-item-renderer',
  templateUrl: './membership-message.html',
  styleUrls: ['./membership-message.scss'],
  host: {
    'class': 'style-scope yt-live-chat-item-list-renderer',
    'show-only-header': ""
  }
})
export class MembershipMessage implements OnInit {

  @Output('initialSize') initialSize = new EventEmitter<number>(false);

  constructor(private elementRef: ElementRef<HTMLElement>) {
    const obs = new ResizeObserver(entry => {
      this.initialSize.next(entry[0].borderBoxSize[0].blockSize);
      this.initialSize.complete();
      obs.disconnect();
    });
    obs.observe(elementRef.nativeElement);
  }

  ngOnInit(): void {
  }

}
