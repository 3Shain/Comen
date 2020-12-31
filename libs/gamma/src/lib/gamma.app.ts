import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  Inject, Input, OnDestroy, Optional, ViewChild, ViewEncapsulation
} from '@angular/core';
import { GammaConfigService } from './gamma-config.service';
import { Message } from './message';
import { MessageProvider, MESSAGE_PROVIDER } from './message-provider';

const ANIMATION_SMOOTH_INTERVAL = 100;

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-app',
  templateUrl: './gamma.app.html',
  styleUrls: ['./gamma.app.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// eslint-disable-next-line
export class GammaApp implements AfterViewInit, OnDestroy {

  private _destroyed = false;

  @ViewChild('offset') offset: ElementRef<HTMLDivElement>;
  @ViewChild('items') items: ElementRef<HTMLDivElement>;
  @ViewChild('scroller') scroller: ElementRef<HTMLDivElement>;
  @ViewChild('data') data: ElementRef<HTMLDivElement>;

  @Input() maxLength = 50;

  renderedQueue: QueuedMessage[] = [];
  bufferQueue: Message[] = [];

  tickers: TickerStatus[] = [];

  private atBottom = true;

  private async rendererCoroutine() {
    while (!this._destroyed) {
      if (this.bufferQueue.length) {
        /** to avoid bug: is every 'frame loop' idempotent? */
        const insertedMessage = this.bufferQueue.shift();
        this.renderedQueue.push({
          id: 0,
          message: insertedMessage
        });
        while (this.atBottom && this.renderedQueue.length > this.maxLength) {
          this.renderedQueue.shift();
        }
        /** check ticker */
        this.checkTicker(insertedMessage);
        /** update DOM */
        this.changeDetector.detectChanges();
        const inserted = this.items.nativeElement.lastElementChild as HTMLElement;

        /** heavy DOM manipulation: batch read/write to avoid reflow  */
        const insertedHeight = inserted.offsetHeight; // read
        const itemsHeight = this.items.nativeElement.offsetHeight; //read
        const scrollerHeight = this.scroller.nativeElement.offsetHeight; //read

        this.offset.nativeElement.setAttribute('style', `height: ${itemsHeight}px`); //write

        if (this.atBottom) {
          //start animation step? or jump over?
          if (scrollerHeight < itemsHeight) {
            this.scroller.nativeElement.scrollTop = (itemsHeight - scrollerHeight); //write
            if (this.bufferQueue.length < 1) { // do animation
              // calculate the length to move
              const animationOffset = Math.min(itemsHeight - scrollerHeight, insertedHeight);
              this.items.nativeElement.setAttribute('style', `transform: translateY(${animationOffset}px)`);
              // now it's safe to do animations
              let acc = 0;
              /** mofify any DOM structure while animation is not expected */
              while (acc < ANIMATION_SMOOTH_INTERVAL) {
                acc -= (performance.now() - await nextFrame());
                this.items.nativeElement.setAttribute('style',
                  `transform: translateY(${easeInOutSine(1 - acc / ANIMATION_SMOOTH_INTERVAL) * animationOffset}px)`);
              }
              this.items.nativeElement.setAttribute('style', `transform: translateY(${0}px)`);
            }

          }
        }
      }
      await nextFrame();
    }
  }

  checkTicker(msg: Message) {
    if (msg.type == 'sticker' || msg.type == 'paid' || msg.type == 'member') {
      const colorInfo = this.config.getColorInfo(msg.price);
      this.tickers.unshift({
        startTime: performance.now(),
        message: msg,
        interval: colorInfo.ticker_timeout,
        status: {
          primary_color: colorInfo.primary,
          secondary_color: colorInfo.secondary,
          text_color: colorInfo.message,
          percent: 0
        }
      });
    }
  }

  private async tickerCoroutine() {
    while (!this._destroyed) {
      const time = await nextFrame();
      this.tickers = this.tickers.filter(ticker => {
        // mutable state...
        ticker.status = {
          percent: (time - ticker.startTime) / ticker.interval / 1000,
          primary_color: ticker.status.primary_color,
          secondary_color: ticker.status.secondary_color,
          text_color: ticker.status.text_color
        };
        if (ticker.status.percent >= 1) {
          return false;
        }
        return true;
      });
      this.changeDetector.detectChanges();
    }
  }

  // eslint-disable-next-line
  onScroll(event: WheelEvent) {
    const contentsHeight = this.offset.nativeElement.offsetHeight;
    const scrollerHeight = this.scroller.nativeElement.offsetHeight; // almost keeping unchanged.
    const scrollTop = this.scroller.nativeElement.scrollTop;
    if (scrollTop + scrollerHeight < contentsHeight) {
      this.atBottom = false;
    } else {
      this.atBottom = true;
    }
  }

  constructor(@Optional() @Inject(MESSAGE_PROVIDER) private provider: MessageProvider,
    private changeDetector: ChangeDetectorRef,
    private config: GammaConfigService) {
    if (provider) {
      provider.registerOnMessage(m => {
        this.bufferQueue.push(m);
      });
    }
  }

  ngAfterViewInit(): void {

    // config in css
    if ('obsstudio' in window) {
      let retryCount = 0;
      (async () => {
        // wait 10 frame to fetch
        while (retryCount < 10) {
          await nextFrame();
          const ret = getComputedStyle(this.data.nativeElement, ':after').content;
          if (ret != 'none') {
            // TODO: parse 
            this.provider.configure({});
            return;
          }
          retryCount++;
        }
        this.provider.configure({});
      })();
    } else {
      this.provider.configure({});
    }

    this.rendererCoroutine();
    this.tickerCoroutine();
  }
  ngOnDestroy() {
    this._destroyed = true;
  }
}

type QueuedMessage = {
  id: number,
  message: Message
};

type TickerStatus = {
  startTime: number;
  interval: number;
  message: Message;
  status: {
    primary_color: string;
    secondary_color: string;
    text_color: string;
    percent: number;
  }
};

function nextFrame() {
  return new Promise<number>((res) => {
    requestAnimationFrame(res);
  });
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}