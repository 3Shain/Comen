import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MessageProcessorService } from '../message-processor.service';
import { ChatRendererComponent } from './chat-renderer/chat-renderer.component';
import { BiliwsService } from '../biliws.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlphaComponent implements OnInit {

  currentRoomId: number;

  @ViewChild('renderer')
  private renderer: ChatRendererComponent;

  constructor(private route: ActivatedRoute,
    private title: Title,
    private proc: MessageProcessorService,
    private bili: BiliwsService,
    private http: HttpClient) { }

  ngOnInit() {
    this.currentRoomId = this.route.snapshot.params['id'];
    this.title.setTitle('直播间' + this.currentRoomId);

    if (this.route.snapshot.queryParamMap.has('loadAvatar')) {
      this.proc.loadAvatar = this.route.snapshot.queryParamMap.get('loadAvatar').toLowerCase() === 'true';
    }
    if (this.route.snapshot.queryParamMap.has('levelFilter')) {
      this.proc.userLevelFilter = Number(this.route.snapshot.queryParamMap.get('levelFilter'));
    }
    if (this.route.snapshot.queryParamMap.has('hideGiftDanmaku')) {
      this.proc.hideGiftDanmaku = this.route.snapshot.queryParamMap.get('hideGiftDanmaku').toLowerCase() === 'true';
    }
    if (this.route.snapshot.queryParamMap.has('showGift')) {
      this.proc.showGift = this.route.snapshot.queryParamMap.get('showGift').toLowerCase() === 'true';
    }
    if (this.route.snapshot.queryParamMap.has('giftOnly')) {
      this.renderer.displayMode = this.route.snapshot.queryParamMap.get('giftOnly').toLowerCase() === 'true' ? 2 : 3;
    }
    if (this.route.snapshot.queryParamMap.has('wordFilter')) {
      this.proc.wordFilter = this.proc.wordFilter.concat(String(this.route.snapshot.queryParamMap.get('wordFilter')).split(','));
    }
    if (this.route.snapshot.queryParamMap.has('groupSimilar')) {
      this.renderer.groupSimilar = this.route.snapshot.queryParamMap.get('groupSimilar').toLowerCase() === 'true';
    }
  }

  onload() {
    if (this.currentRoomId <= 0) {
      this.renderer.sendSystemInfo('直播间ID格式错误');
      return;
    }
    this.renderer.sendSystemInfo('正在获取直播间信息...');
    this.http.get(`${environment.api_server}/stat/${this.currentRoomId}`).subscribe(
      (x: any) => {
        this.bili.ownerId = x.uid;
        if (x.config) {
          this.proc.loadAvatar = x.config.loadAvatar||this.proc.loadAvatar;
          this.proc.userLevelFilter = x.config.levelFilter||this.proc.userLevelFilter;
          this.proc.hideGiftDanmaku = x.config.hideGiftDanmaku||this.proc.hideGiftDanmaku;
          this.proc.showGift = x.config.showGift||this.proc.showGift;
          this.proc.wordFilter = this.proc.wordFilter.concat(x.config.wordFilter||[]);
          this.proc.customEmotions = x.config.customEmotions||[];
          this.proc.customGiftLevel = x.config.customGiftLevel||this.proc.customGiftLevel;
          this.proc.customGiftLevel.sort((a,b)=>{return b.value-a.value;});//sort from large to small
          this.renderer.displayMode = x.config.displayMode||this.renderer.displayMode;
          this.renderer.groupSimilar = x.config.groupSimilar||this.renderer.groupSimilar;
          this.renderer.groupSimilarWindow = x.config.groupSimilarWindow||this.renderer.groupSimilarWindow;
          this.renderer.maxDammakuNum = x.config.maxDammakuNumber||this.renderer.maxDammakuNum;
        }
        this.start(x.room_id);
      },
      e => {
        this.renderer.sendSystemInfo('直播间信息获取失败,尝试rawId');
        this.start(this.currentRoomId);
      }
    );
  }

  start(realRoomId: number) {
    this.renderer.sendSystemInfo(`正在连接到直播间${realRoomId}...`);
    this.bili.connect(Number(realRoomId)).subscribe(
      message => {
        if (message.type === 'connected') {
          this.renderer.sendSystemInfo('成功连接到直播间!');
          if (environment.official) {
            //this.renderer.sendSystemInfo('你正在使用公共服务器提供的服务，为了更高的稳定性，建议使用本地部署版本。详情访问https://bilichat.3shain.com');
          }
        } else {
          this.renderer.sendDanmaku(message);
        }
      },
      e => {
        if (e.target.readyState === WebSocket.CLOSED) {
          this.renderer.sendSystemInfo('无法连接到直播间,5秒后重试');
          setTimeout(() => this.start(realRoomId), 5000);
        }
      },
      () => {
        this.renderer.sendSystemInfo('检测到服务器断开,尝试重连中...');
        this.start(realRoomId); // 重连
      }
    );
  }

}
