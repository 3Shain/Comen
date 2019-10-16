import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input, Output, EventEmitter, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { IMessage, DanmakuMessage } from '../../danmaku.def';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'yt-live-chat-renderer',
  templateUrl: './gkd-renderer.component.html',
  styleUrls: ['./gkd-renderer.component.css']
})
export class GKDRendererComponent {

  danmakuList: Array<IMessage>;
  shadowMessage: IMessage;
  waitForRendering: Array<IMessage>;
  groupSimilarCache: Array<DanmakuMessage>;

  @ViewChild('items', { static: true }) items: ElementRef;

  @ViewChild('shadowItem', { static: true }) shadowItem: ElementRef;

  constructor(private renderer2: Renderer2,@Inject(PLATFORM_ID) private plat: Object) {
    this.danmakuList = [];
    this.waitForRendering = [];
    this.groupSimilarCache = [];
    this.onawake = new EventEmitter();
    this.shadowMessage = null;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.plat)) {
      requestAnimationFrame(()=>{
        //empty frame
        requestAnimationFrame(this.awake.bind(this));
      });
    }
  }

  @Input() public maxDammakuNum = 100;

  @Input() public displayMode = 3;

  @Input() public groupSimilar = true;

  @Output() public onawake: EventEmitter<any>;

  @Input() public groupSimilarWindow = 5;

  private timeFunction(total: number, sumup: number): number {
    return total - sumup * this.baseSpeed; //linear function
  }

  private animationHeight: number = 0;
  private animationSumup: number = 0;
  private animating: boolean = false;

  private baseSpeed: number = 0.45;

  awake() {
    this.onawake.emit();
    requestAnimationFrame(this.onFrame.bind(this, window.performance.now(), 0));
  }

  onFrame(lastFrame: number, ttw: number) {
    const now: number = window.performance.now();
    const interval: number = now - lastFrame;
    this.animationSumup += interval;

    if (interval > 1000) {// 窗口不在active状态时，此方法不会被调用。
      this.waitForRendering = [];
      // this.sendSystemInfo('窗口已恢复激活');
    }

    //pipe 0
    if (this.animating) {
      let remain = this.timeFunction(this.animationHeight, this.animationSumup); //px
      if (remain <= 0) {
        remain = 0;
        this.animating = false;
      }
      this.renderer2.setStyle(this.items.nativeElement, 'transform', `translateY(${remain}px)`);
    }

    //pipe 1
    if (!this.animating && ttw <= 0 && this.shadowMessage != null) {
      //render it

      const height: number = this.shadowItem.nativeElement.offsetHeight - 2;
      this.animationHeight = height;

      while (this.danmakuList.length > this.maxDammakuNum) {
        this.danmakuList.shift();
      }
      this.danmakuList.push(this.shadowMessage);
      this.shadowMessage = null;

      const timeR: number = height / this.baseSpeed;
      const timeL: number = 1000 / ((this.waitForRendering.length > 0) ? this.waitForRendering.length : 1);
      if (timeR * 2.33 < timeL) {
        // 2.33真是一个非常随便的系数呢->为的只是让弹幕*不*匀速弹出来
        this.animating = true;
        this.animationSumup = 0;
        this.renderer2.setStyle(this.items.nativeElement, 'transform', `translateY(${height}px)`);
      } else {
        this.renderer2.setStyle(this.items.nativeElement, 'transform', `translateY(0px)`);
      }
      ttw = timeL;
    }

    //pipe 2
    if (this.shadowMessage == null && this.waitForRendering.length > 0) {
      this.shadowMessage = this.waitForRendering.shift();
    }

    ttw -= interval;

    requestAnimationFrame(this.onFrame.bind(this, now, ttw));
  }

  public sendSystemInfo(msg: string) {
    this.sendDanmaku(new DanmakuMessage(
      -1,
      'BILICHAT',
      msg,
      0,
      true,
      undefined,
      'assets/logo_icon.png'
    ));
  }

  public sendDanmaku(msg: IMessage) {
    if ((this.displayMode & <number>msg.mode) === 0 && msg.uid !== -1) {
      return;
    }
    if (msg.type === 'danmaku' && msg.uid > 0) {
      for (const c of this.groupSimilarCache) {
        if (this.groupSimilar
          && (c.message.indexOf((<DanmakuMessage>msg).message) !== -1 || (<DanmakuMessage>msg).message.indexOf(c.message) !== -1)
          && (Math.abs(c.message.length - (<DanmakuMessage>msg).message.length) < Math.min(c.message.length, (<DanmakuMessage>msg).message.length))
        ) {
          c.repeat++;
          return; // 如果存在相似元素,会在这里被截断
        }
      }
      this.groupSimilarCache.unshift(<DanmakuMessage>msg);
      while (this.groupSimilarCache.length > this.groupSimilarWindow) {
        this.groupSimilarCache.pop();
      }
    }
    {
      this.waitForRendering.push(msg);
    }
  }
}
