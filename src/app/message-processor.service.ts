import { Injectable } from '@angular/core';
import { IMessage, DanmakuMessage, GiftMessage } from './danmaku.def';
import { Observable, race, timer, fromEvent, Subscriber, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageProcessorService {

  userLevelFilter: number = 0;

  minGiftValue: number = 50;

  showGift: boolean = true;

  hideGiftDanmaku: boolean = true;

  //showMember:boolean;

  //showModerator:boolean;

  loadAvatar: boolean = true;

  wordFilter: Array<string> = [
    "kimo", "风暴",
    "弹幕姬", "弹幕机",
    "别刷", "不要刷",
    "小鬼", "biss",
    "嘴臭", "骂我",
    "梗",
    "傻逼", "弱智", "脑残", "屏蔽", "cnm",
    "警察", "加群", "群号", "QQ群", "出警",
    "人工智能", "老婆"
  ];

  constructor() { }

  formMessage(rawData: any, observer: Subscriber<IMessage>) {
    if (rawData.cmd == "DANMU_MSG") {
      if (this.hideGiftDanmaku && rawData.info[0][9] > 0) {
        return;//屏蔽礼物弹幕
      }
      if (this.userLevelFilter > rawData.info[4][0] && rawData.info[2][2] == 0 && rawData.info[7] == 0) {
        return;//用户等级屏蔽
      }
      let content = String(rawData.info[1]);
      if (this.wordFilter.some((item) => {
        return content.indexOf(item) != -1;
      })) {
        return;//关键字屏蔽
      }

      this.avatarPreload(rawData.info[2][0]).subscribe(
        c => {
          if (c)
            observer.next(new DanmakuMessage(
              rawData.info[2][0],
              rawData.info[2][1],
              rawData.info[1],
              rawData.info[7],
              rawData.info[2][2] == 1
            ));
          else
            observer.next(new DanmakuMessage(
              0,
              rawData.info[2][1],
              rawData.info[1],
              rawData.info[7],
              rawData.info[2][2] == 1
            ));
        }
      )
    }
    else if (this.showGift && rawData.cmd == "SEND_GIFT") {
      if (rawData.data.coin_type != "gold") {//gold/silver
        return;
      }
      let value = rawData.data.total_coin;
      if (value < this.minGiftValue * 1000) {//计算用的scale
        return;
      }

      this.avatarPreload(rawData.data.uid).subscribe(
        c => {
          if (c)
            observer.next(new GiftMessage(
              rawData.data.uid,
              rawData.data.uname,
              rawData.data.giftName,
              rawData.data.num,
              value / 1000
            ));
          else
            observer.next(new GiftMessage(
              0,
              rawData.data.uname,
              rawData.data.giftName,
              rawData.data.num,
              value / 1000
            ));
        }
      )
    }
  }

  avatarPreload(userid: number): Observable<boolean> {
    if (!this.loadAvatar) {
      return of(false);
    }
    var img = new Image();
    img.src = `${environment.api_server}/avatar/${userid}`;
    return race(
      timer(1000).pipe(
        map(x => false)
      ),
      fromEvent(img, 'load').pipe(
        map(x => true),
      ),
      fromEvent(img, 'error').pipe(
        map(x => false)
      )
    );
  }

}

