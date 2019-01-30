import { Component, OnInit, ViewEncapsulation, Input, PLATFORM_ID, Inject } from '@angular/core';
import { BiliwsService } from '../../biliws.service';
import { isPlatformBrowser } from '@angular/common';
import { Observable, fromEvent } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'yt-live-chat-renderer',
  templateUrl: './chat-renderer.component.html',
  styleUrls: ['./chat-renderer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatRendererComponent implements OnInit {
  danmakuList: Array<any>;

  private _roomId: number;

  @Input()

  public get roomId(): number {
    return this._roomId;
  }

  public set roomId(v: number) {
    this._roomId = v;
  }

  constructor(private bili: BiliwsService, @Inject(PLATFORM_ID) private plat: Object) {
    this.danmakuList = new Array();
  }

  private lastDanmaku:string;

  ngOnInit() {
    if (!isPlatformBrowser(this.plat)) {
      return;
    }
    this.sendSystemInfo(`正在连接到直播间${this._roomId}...`);
    this.bili.connect(Number(this._roomId)).subscribe(
      x => {
        if (x.type == "message") { 
          console.table(x.data);
          while(this.danmakuList.length>100){
            this.danmakuList.shift();//清理以提升效率
          }
          if(x.data.cmd=="DANMU_MSG"){
            //fielterhere
            var mssg = String(x.data.info[1]);
            if(mssg.indexOf('哔哩哔哩 (゜-゜)つロ 干杯~')!=-1){
              return;//
            }
            if(mssg==this.lastDanmaku){
              if(mssg!="awsl"&&mssg!="草"&&mssg.indexOf("888")==-1){
                console.log("stop！");
                return;
              }
            }
            this.lastDanmaku=mssg;
            var img = new Image();
            img.src=`${environment.api_server}/v1/bilichat/avatar/${x.data.info[2][0]}`;
            img.onload=()=>{
              this.danmakuList.push({
                type:'msg',
                username:x.data.info[2][1],
                message:x.data.info[1],
                avatarUrl:img.src
              });
            }
            img.onerror=()=>{
              this.danmakuList.push({
                type:'msg',
                username:x.data.info[2][1],
                message:x.data.info[1],
                avatarUrl:'https://static.hdslb.com/images/member/noface.gif'
              });
            }
          }
          else if(x.data.cmd=="SEND_GIFT"){
            var img = new Image();
            img.src=`${environment.api_server}/v1/bilichat/avatar/${x.data.data.uid}`;
            if(x.data.data.coin_type!="gold"){//gold/silver
              return;
            }
            var value = x.data.data.total_coin;
            if(value<50*1000){//计算用的scale
              return;
            }
            img.onload=()=>{
              this.danmakuList.push({
                type:'gift',
                username:x.data.data.uname,
                avatarUrl:img.src,
                gift:x.data.data.giftName,
                amount:x.data.data.num,
                value:value/1000
              });
            };
            img.onerror=()=>{
              this.danmakuList.push({
                type:'gift',
                username:x.data.data.uname,
                avatarUrl:'https://static.hdslb.com/images/member/noface.gif',
                gift:x.data.data.giftName,
                amount:x.data.data.num,
                value:value/1000
              });
            }
          }
        }
        else if(x.type=='open'){
          this.sendSystemInfo('成功连接到直播间!');
        }
      },
      e=>{

      },
      ()=>{
        this.sendSystemInfo('检测到服务器断开,尝试重连中');
        this.ngOnInit();//重连
      }
    );
  }

  private sendSystemInfo(msg){
    this.danmakuList.push({
      type:'msg',
      username:'BILICHAT',
      message:msg,
      avatarUrl:"/favicon.ico"
    });
  }

  ngAfterViewChecked() {
    if (!isPlatformBrowser(this.plat)) {
      return;
    }
    try {
      window.scrollTo(0, document.body.scrollHeight);
      //document.documentElement.scrollTop = document.body.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

}
