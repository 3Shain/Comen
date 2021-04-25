import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  Inject, Input, NgZone, OnDestroy, Optional, ViewChild, ViewEncapsulation
} from '@angular/core';
import { GammaConfigService } from './gamma-config.service';
import { Message,nextFrame, easeInOutSine } from '@comen/common';
import { MessageProvider, MESSAGE_PROVIDER } from './message-provider';

const ANIMATION_SMOOTH_INTERVAL = 100;
const ANIMATION_BUFFER_INTERVAL = 500;
const VALID_TYPE = {
  text: true,
  sticker: true,
  paid: true,
  member: true,
  blank: true,
  richtext: true
};

@Component({
  // eslint-disable-next-line
  selector: 'yt-live-chat-app',
  templateUrl: './gamma.app.html',
  styleUrls: ['./gamma.app.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    GammaConfigService
  ]
})
// eslint-disable-next-line
export class GammaApp implements AfterViewInit, OnDestroy {

  private _destroyed = false;

  @ViewChild('offset') offset: ElementRef<HTMLDivElement>;
  @ViewChild('items') items: ElementRef<HTMLDivElement>;
  @ViewChild('scroller') scroller: ElementRef<HTMLDivElement>;

  renderedQueue: QueuedMessage[] = [];
  bufferQueue: QueuedMessage[] = [];

  tickers: TickerStatus[] = [];

  private atBottom = true;
  private trackIdGen = 0;

  identifyMessage(index: number, item: Message) {
    return item;
  }

  private async rendererCoroutine() {
    let lastItemInserted = 0;
    while (!this._destroyed) {
      if (this.bufferQueue.length) {
        while (this.bufferQueue.length > 1) {
          // no too much :)
          this.renderedQueue.push(this.bufferQueue.shift());
        }
        /** to avoid bug: is every 'frame loop' idempotent? */
        const insertedMessage = this.bufferQueue.shift();
        this.renderedQueue.push(insertedMessage);
        while (this.atBottom && this.renderedQueue.length > this.config.current$.value.maxDanmakuNumber) {
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
            if (performance.now() - lastItemInserted > ANIMATION_BUFFER_INTERVAL
              && !this.config.current$.value.disableSmoother) { // do animation
              // calculate the length to move
              const animationOffset = Math.min(itemsHeight - scrollerHeight, insertedHeight);
              this.items.nativeElement.setAttribute('style', `transform: translate3d(0,${animationOffset}px,0)`);
              // now it's safe to do animations
              let acc = 0;
              /** mofify any DOM structure while animation is not expected */
              while (acc < ANIMATION_SMOOTH_INTERVAL) {
                acc -= (performance.now() - await nextFrame());
                this.items.nativeElement.setAttribute('style',
                  `transform: translate3d(0,${easeInOutSine(1 - acc / ANIMATION_SMOOTH_INTERVAL) * animationOffset}px,0)`);
              }
              this.items.nativeElement.setAttribute('style', `transform: translate3d(0,${0}px,0)`);
            }
          }
          lastItemInserted = performance.now();
        }
      }
      await nextFrame();
    }
  }

  checkTicker(msg: Message) {
    if (msg.type == 'sticker' || msg.type == 'paid' || msg.type == 'member') {
      if (this.config.current$.value.tickerDisplayThreshold > msg.price) {
        return;
      }
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

  constructor(@Optional() @Inject(MESSAGE_PROVIDER) provider: MessageProvider,
    private changeDetector: ChangeDetectorRef,
    public config: GammaConfigService,
    public ngzone:NgZone) {
    if (provider) {
      provider.registerOnMessage(m => {
        if (document.visibilityState == 'hidden') {
          return;
        }
        if (m.type == 'fold') {

        } else if (m.type in VALID_TYPE) {
          this.bufferQueue.push(m as any);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.ngzone.runOutsideAngular(()=>{
      // for high performance!
      this.rendererCoroutine();
      this.tickerCoroutine();
    });
  }
  ngOnDestroy() {
    this._destroyed = true;
  }
}

type QueuedMessage = {
  id: number,
} & Message;

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