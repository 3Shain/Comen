import { Component, ElementRef, Inject, Input, OnInit, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { Message } from './message';
import { MessageProvider, MESSAGE_PROVIDER } from './message-provider';

@Component({
  selector: 'yt-live-chat-app',
  templateUrl: './gamma.app.html',
  styleUrls: ['./gamma.app.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GammaApp {

  @ViewChild('offset') offset: ElementRef<HTMLDivElement>;
  @ViewChild('items') items: ElementRef<HTMLDivElement>;
  @ViewChild('scroller') scroller: ElementRef<HTMLDivElement>;

  @Input('maxLength') maxLength: number = 50;

  messages: Message[] = [];

  private _msgId = 0;
  get messageId() {
    return this._msgId++;
  }

  private atBottom = true;

  onItemInitialized(id: number, size: number) {
    if (this.atBottom) {
      this.toScroll.push(size);
    }
  }

  //任意一个发生变化都会直接fuckedup
  toScroll: number[] = [];

  private async onFrame() {
    while (true) { //todo: control bits
      const contentsHeight = this.offset.nativeElement.offsetHeight;
      const scrollerHeight = this.scroller.nativeElement.offsetHeight; // almost keeping unchanged.
      if (contentsHeight > scrollerHeight) {
        if (this.toScroll.length > 1) { //阈值：
          // const height = this.toScroll.shift();
          this.scroller.nativeElement.scrollTop = contentsHeight - scrollerHeight;
          this.toScroll = [];
          console.log('no animations!');
        } else if (this.toScroll.length > 0) {
          //do animations in three frame
          const height = this.toScroll.shift();
          let counter = 6;
          // let newOffset = this.toScroll.reduce((a, b) => a + b, 0);// sum;
          this.scroller.nativeElement.scrollTop = contentsHeight - scrollerHeight - 0;
          this.items.nativeElement.style.transform = `translateY(${height + 0}px)`;
          // 全被这里扬了
          while (counter > 0 && this.atBottom) {
            console.log('animating');
            counter -= 1;
            await nextFrame();
            //这里可能总高度变了，
            // newOffset = this.toScroll.reduce((a, b) => a + b, 0);// sum; //总高度变化后就开始翻车
            this.items.nativeElement.style.transform = `translateY(${(easeInOutSine(counter / 6)) * height + 0}px)`;
          }
          this.items.nativeElement.style.transform = `translateY(${0}px)`;
          // 问题就出在newOffset大于0...
          // await nextFrame();
          // await nextFrame();
          // await nextFrame();
          // await nextFrame();
        }
      }
      await nextFrame();
    }
  }

  onScroll(event: WheelEvent) {
    const contentsHeight = this.offset.nativeElement.offsetHeight;
    const scrollerHeight = this.scroller.nativeElement.offsetHeight; // almost keeping unchanged.
    const scrollTop = this.scroller.nativeElement.scrollTop;
    if (scrollTop + scrollerHeight + this.toScroll.reduce((a, b) => a + b, 0) < contentsHeight) {
      this.atBottom = false;
      console.log('shit');
    } else {
      this.atBottom = true;
    }
  }

  constructor(@Optional() @Inject(MESSAGE_PROVIDER) provider:MessageProvider) { 
    if(provider){
      provider.registerOnMessage(m=>{
        this.messages.push(m);
        while(this.messages.length>this.maxLength){
          this.messages.shift();
        }
      });
    }
  }

  ngAfterViewInit(): void {
    const obs = new ResizeObserver(entry => {
      this.offset.nativeElement.style.height = entry[0].contentRect.height + 'px';
    });
    obs.observe(this.items.nativeElement);

    //test code
    // setInterval(() => {
    //   this.messages.push({
    //     type: "text",
    //     content: "Test",
    //     username: "USER_NAME",
    //     avatar: "",
    //     badges: [],
    //     usertype:0,
    //   })
    //   while (this.messages.length > 50 && this.atBottom) {
    //     this.messages.shift(); //shift to max_conments?
    //   }
    // }, 500);

    this.onFrame();
  }
}

function nextFrame() {
  return new Promise((res) => {
    requestAnimationFrame(res);
  });
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}