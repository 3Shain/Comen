import { Component, OnInit, ViewEncapsulation, Input, PLATFORM_ID, Inject, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { BiliwsService } from '../../biliws.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMessage, DanmakuMessage, GiftMessage } from '../../../app/danmaku.def';

@Component({
  selector: 'yt-live-chat-renderer',
  templateUrl: './chat-renderer.component.html',
  styleUrls: ['./chat-renderer.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ChatRendererComponent implements OnInit {

  danmakuList: Array<IMessage>;

  waitForRendering: Array<IMessage>;

  private _roomId: number; // 这个不是真正的roomId

  @Input()
  public set roomId(v: number) {
    this._roomId = v;
  }

  constructor(private bili: BiliwsService,
    @Inject(PLATFORM_ID) private plat: Object,
    private http: HttpClient) {
    this.danmakuList = [];
    this.waitForRendering = [];
  }

  public update() {
    if (Date.now() - this.bili.lastRenderInvoke > 1000) {// 窗口不在active状态时，此方法不会被调用。
      this.waitForRendering = [];
      this.sendSystemInfo('窗口已恢复激活');
    }
    this.bili.lastRenderInvoke = Date.now();
    if (this.waitForRendering.length > 0) {
      if (Date.now() - this.bili.lastRenderPush >= (1000.0 / this.waitForRendering.length)) {
        this.bili.lastRenderPush = Date.now();
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
      console.log('server env.');
      return;
    }

    requestAnimationFrame(this.awake.bind(this));
  }

  public awake(){
    if (this._roomId <= 0) {
      this.sendSystemInfo('直播间ID格式错误');
      return;
    }
    this.sendSystemInfo('正在获取直播间信息...');
    this.http.get(`${environment.api_server}/stat/${this._roomId}`).subscribe(
      (x: any) => {
        this.start(x.room_id);
      },
      e => {
        this.sendSystemInfo('直播间信息获取失败,尝试rawId');
        this.start(this._roomId);
      }
    );

    this.bili.lastRenderInvoke = Date.now();
    this.bili.lastRenderPush = Date.now();
    requestAnimationFrame(this.update.bind(this));
  }

  start(realRoomId: number) {
    this.sendSystemInfo(`正在连接到直播间${realRoomId}...`);
    this.bili.connect(Number(realRoomId)).subscribe(
      x => {
        if (x.type === 'connected') {
          this.sendSystemInfo('成功连接到直播间!');
        } else {
          this.sendDanmaku(x);
        }
      },
      e => {
        if (e.target.readyState === WebSocket.CLOSED) {
          this.sendSystemInfo('无法连接到直播间,5秒后重试');
          setTimeout(() => this.start(realRoomId), 5000);
        }
      },
      () => {
        this.sendSystemInfo('检测到服务器断开,尝试重连中...');
        this.start(realRoomId); // 重连
      }
    );
  }

  private sendSystemInfo(msg: string, force:boolean=false) {
    this.sendDanmaku(new DanmakuMessage(
      -1,
      'BILICHAT',
      msg,
      0,
      true
    ),force);
  }

  private sendDanmaku(msg: IMessage,force:boolean=false) {
    if(force){
      this.danmakuList.push(msg);
    }else{
      this.waitForRendering.push(msg);}
  }
}
