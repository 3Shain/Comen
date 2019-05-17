import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MessageProcessorService } from '../message-processor.service';
import { ChatRendererComponent } from './chat-renderer/chat-renderer.component';
import { BiliwsService } from '../biliws.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

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
    private http: HttpClient,
    private translate: TranslateService) { }

  ngOnInit() {
    this.currentRoomId = this.route.snapshot.params['id'];
    this.translate.get('ROOM').subscribe((value) => {
      this.title.setTitle(value + ' ' + this.currentRoomId);
    });

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
    if (this.route.snapshot.queryParamMap.has('pure')) {
      this.proc.pure = this.route.snapshot.queryParamMap.get('pure').toLowerCase() === 'true';
    }
  }

  onload() {
    if (this.currentRoomId <= 0) {
      this.translate.get('IDFORMATERROR').subscribe((value) => {
        this.renderer.sendSystemInfo(value);
      });
      return;
    }
if (this.proc.pure) {
      this.start(this.currentRoomId);
    } else {
      this.translate.get('GETROOMINFO').subscribe((value) => {
      this.renderer.sendSystemInfo(value);
    });
    this.http.get(`${environment.api_server}/stat/${this.currentRoomId}`).subscribe(
      (x: any) => {
        this.bili.ownerId = x.uid;
        if (x.config) {
          this.proc.loadAvatar = x.config.loadAvatar || this.proc.loadAvatar;
          this.proc.userLevelFilter = x.config.levelFilter || this.proc.userLevelFilter;
          this.proc.hideGiftDanmaku = x.config.hideGiftDanmaku || this.proc.hideGiftDanmaku;
          this.proc.showGift = x.config.showGift || this.proc.showGift;
          this.proc.wordFilter = this.proc.wordFilter.concat(x.config.wordFilter || []);
          this.proc.customEmotions = x.config.customEmotions || [];
          this.renderer.displayMode = x.config.displayMode || this.renderer.displayMode;
          this.renderer.groupSimilar = x.config.groupSimilar || this.renderer.groupSimilar;
          this.renderer.groupSimilarWindow = x.config.groupSimilarWindow || this.renderer.groupSimilarWindow;
          this.renderer.maxDammakuNum = x.config.maxDammakuNumber || this.renderer.maxDammakuNum;
        }
        this.start(x.room_id);
      },
      e => {
        this.translate.get('ROOMINFORAWID').subscribe((value) => {
          this.renderer.sendSystemInfo(value);
        });
        this.start(this.currentRoomId);
      }
    );
    }
  }

  start(realRoomId: number) {
    this.translate.get('CONNECTING').subscribe((value) => {
      this.renderer.sendSystemInfo(value + realRoomId + '...');
    });
    this.bili.connect(Number(realRoomId)).subscribe(
      message => {
        if (message.type === 'connected') {
          this.translate.get('CONNECTED').subscribe((value) => {
            this.renderer.sendSystemInfo(value);
          });
          if (environment.official) {
            //this.renderer.sendSystemInfo('你正在使用公共服务器提供的服务，为了更高的稳定性，建议使用本地部署版本。详情访问https://bilichat.3shain.com');
          }
        } else {
          this.renderer.sendDanmaku(message);
        }
      },
      e => {
        if (e.target.readyState === WebSocket.CLOSED) {
          this.translate.get('CONNECTCLOSED').subscribe((value) => {
            this.renderer.sendSystemInfo(value);
          });
          setTimeout(() => this.start(realRoomId), 5000);
        }
      },
      () => {
        this.translate.get('DISCONNECTED').subscribe((value) => {
          this.renderer.sendSystemInfo(value);
        });
        this.start(realRoomId); // 重连
      }
    );
  }

}
