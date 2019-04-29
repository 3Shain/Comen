import { Component, OnInit, ViewEncapsulation, Input, Inject ,PLATFORM_ID, OnChanges, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { IMessage, DanmakuMessage, GiftMessage, DisplayMode } from '../../../app/danmaku.def';

@Component({
  selector: 'yt-live-chat-renderer',
  templateUrl: './chat-renderer.component.html',
  styleUrls: ['./chat-renderer.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ChatRendererComponent implements OnInit {

  danmakuList: Array<IMessage>;

  waitForRendering: Array<IMessage>;

  @Input() public displayMode:number=3;

  @Output() public onawake:EventEmitter<any>;

  constructor(@Inject(PLATFORM_ID) private plat: Object) {
    this.danmakuList = [];
    this.waitForRendering = [];
    this.onawake = new EventEmitter();
  }

  private lastRenderInvoke:number;
  private lastRenderPush:number;

  public update() {
    if (Date.now() - this.lastRenderInvoke > 1000) {// 窗口不在active状态时，此方法不会被调用。
      this.waitForRendering = [];
      //this.sendSystemInfo('窗口已恢复激活');
    }
    this.lastRenderInvoke = Date.now();
    if (this.waitForRendering.length > 0) {
      if (Date.now() - this.lastRenderPush >= (1000.0 / this.waitForRendering.length)) {
        this.lastRenderPush = Date.now();
        while (this.danmakuList.length > 100) {// 最大渲染数量100
          this.danmakuList.shift();
        }
        this.danmakuList.push(this.waitForRendering.shift());
      }
    }
    requestAnimationFrame(this.update.bind(this));
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.plat)) {
      return;
    }
    requestAnimationFrame(this.awake.bind(this));
  }

  public awake() {
    this.onawake.emit();

    this.lastRenderInvoke = Date.now();
    this.lastRenderPush = Date.now();
    requestAnimationFrame(this.update.bind(this));
  }

  public sendSystemInfo(msg: string, force: boolean = false) {
    this.sendDanmaku(new DanmakuMessage(
      -1,
      'BILICHAT',
      msg,
      0,
      true
    ), force);
  }

  public sendDanmaku(msg: IMessage, force: boolean = false) {
    if((this.displayMode&<number>msg.mode)==0&&msg.uid!=-1){
      return;
    }
    if (force) {
      this.danmakuList.push(msg);
    } else {
      this.waitForRendering.push(msg);
    }
  }
}
