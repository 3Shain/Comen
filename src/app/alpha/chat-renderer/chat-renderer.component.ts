import { Component, OnInit, ViewEncapsulation, Input, PLATFORM_ID, Inject } from '@angular/core';
import { BiliwsService } from '../../biliws.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMessage, DanmakuMessage, GiftMessage } from '../../../app/danmaku.def';

@Component({
  selector: 'yt-live-chat-renderer',
  templateUrl: './chat-renderer.component.html',
  styleUrls: ['./chat-renderer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatRendererComponent implements OnInit {

  danmakuList: Array<IMessage>;

  waitForRendering: Array<IMessage>;

  private _roomId: number;//这个不是真正的roomId

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

  private lastRender: number = Date.now();

  public render() {
    while (this.waitForRendering.length > 0) {
      this.danmakuList.push(this.waitForRendering.shift());
      while (this.danmakuList.length > 100) {//最大渲染数量100
        this.danmakuList.shift();
      }
    }
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(this.render.bind(this), 1000);
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.plat)) {
      console.log('server env.');
      return;
    }
    if (this._roomId <= 0) {
      this.sendSystemInfo("直播间ID格式错误");
      return;
    }
    this.sendSystemInfo("正在获取直播间信息...");
    this.http.get(`${environment.api_server}/stat/${this._roomId}`).subscribe(
      (x: any) => {
        if (x.room_id) {
          this.start(x.room_id);
        }
        else {
          this.sendSystemInfo("直播间信息获取失败:" + x);
        }
      },
      e => {
        this.sendSystemInfo("直播间信息获取失败,尝试rawId");
        this.start(this._roomId);
      }
    )

    requestAnimationFrame(this.render.bind(this));
  }

  start(realRoomId: number) {
    this.sendSystemInfo(`正在连接到直播间${realRoomId}...`);
    this.bili.connect(Number(realRoomId)).subscribe(
      x => {
        if (x.type == 'connected') {
          this.sendSystemInfo('成功连接到直播间!');
        }
        else {
          this.sendDanmaku(x);
        }
      },
      e => {
        if (e.target.readyState == WebSocket.CLOSED) {
          this.sendSystemInfo('无法连接到直播间,5秒后重试');
          setTimeout(() => this.start(realRoomId), 5000);
        }
      },
      () => {
        this.sendSystemInfo('检测到服务器断开,尝试重连中...');
        this.start(realRoomId);//重连
      }
    );
  }

  private sendSystemInfo(msg: string) {
    this.sendDanmaku(new DanmakuMessage(
      -1,
      'BILICHAT',
      msg,
      0,
      true
    ));
  }

  private sendDanmaku(msg: IMessage) {
    this.waitForRendering.push(msg);
  }
}
