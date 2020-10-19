import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ChatRendererComponent } from '../alpha/chat-renderer/chat-renderer.component';
import { DanmakuMessage, GiftMessage } from '../danmaku.def';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  entrys: Array<any>;

  @ViewChild('renderer',{static: false})
  public renderer: ChatRendererComponent;

  constructor(@Inject(PLATFORM_ID) private plat: Object, private http: HttpClient) { }

  ngAfterViewInit() {
    /* TODO: Server State Transit */
    if (!isPlatformBrowser(this.plat)) {
      return;
    }
    this.http.get<Array<any>>(`${environment.api_server}/history`).subscribe(
      resp => {
        this.entrys = resp;
      }
    );
    this.renderer.sendSystemInfo('Hello World!');
    this.renderer.sendDanmaku(new DanmakuMessage(4331384, '3Shain', '我是单推人(指一天单推一个', 1, false, undefined, 'https://i2.hdslb.com/bfs/face/b4efacefd9fe31ae253c610168738483631d3d22.jpg'));


    this.renderer.sendSystemInfo('以下为演示效果');
    this.renderer.sendDanmaku(new DanmakuMessage(0, 'DD0', 'awsl', 0, false, undefined));
    let g = new GiftMessage(109402, '3Shain', '小电视', 2, 1245000, 0, {
      color_header: 'rgba(255,255,255,1)',
      color_primary: 'rgba(230,33,23,1)',
      color_secondary: 'rgba(208,0,0,1)',
      color_message: 'rgba(255,255,255,1)',
      color_author_name: 'rgba(255,255,255,0.701961)'
    }, undefined);
    //g.paid_message='23333';
    this.renderer.sendDanmaku(g);
    this.renderer.sendDanmaku(new DanmakuMessage(0, 'DD1', '单推了', 0, false, undefined));
    this.renderer.sendDanmaku(new DanmakuMessage(0, 'DD2', 'awsl', 0, false, undefined));
    this.renderer.sendDanmaku(new DanmakuMessage(0, 'DD3', '草', 3, false, undefined));
  }

  getImageUrl(uid) {
    return environment.api_server + '/avatar/' + uid;
  }

  getTimeString(time) {
    return (new Date(time)).toLocaleDateString() + ' ' + (new Date(time)).toLocaleTimeString();
  }
}
