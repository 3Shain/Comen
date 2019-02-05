import { Component, OnInit, ViewEncapsulation, Input, PLATFORM_ID, Inject } from '@angular/core';
import { BiliwsService } from '../../biliws.service';
import { isPlatformBrowser } from '@angular/common';
import { Observable, fromEvent } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'yt-live-chat-renderer',
  templateUrl: './chat-renderer.component.html',
  styleUrls: ['./chat-renderer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatRendererComponent implements OnInit {
  
  danmakuList: Array<any>;

  waitForRendering: Array<any>;

  private _roomId: number;//这个不是真正的roomId

  @Input()
  public set roomId(v: number) {
    this._roomId = v;
  }

  constructor(private bili: BiliwsService, 
    @Inject(PLATFORM_ID) private plat: Object,
    private http:HttpClient) {
    this.danmakuList = new Array();
    this.waitForRendering = new Array();
  }

  private lastDanmaku:string;
  private lastInvoke:number=Date.now();
  private lastRender:number=Date.now();
  private counter:number=0;

  public render(){
    this.lastInvoke=Date.now();
    if(this.waitForRendering.length>0){
      if(Date.now()-this.lastRender>=(1000.0/this.waitForRendering.length)){
        this.lastRender=Date.now();
        while(this.danmakuList.length>100){
          this.danmakuList.shift();
        }
        this.danmakuList.push(this.waitForRendering.shift());
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
    requestAnimationFrame(this.render.bind(this));
  }

  ngOnInit(){
    if (!isPlatformBrowser(this.plat)) {
      return;
    }
    if(this._roomId<=0){
      this.sendSystemInfo("直播间ID格式错误");
      return;
    }
    this.http.get(`${environment.api_server}/stat/${this._roomId}`).subscribe(
      (x:any)=>{
        if(x.success){
          this.start(x.data.room_id);
        }
        else{
          this.sendSystemInfo("直播间信息获取失败:"+x.message);
        }
      },
      e=>{
        this.sendSystemInfo("直播间信息获取失败,尝试rawId");
        this.start(this._roomId);
      }
    )
    
    requestAnimationFrame(this.render.bind(this));
  }

  start(realRoomId:number) {
    this.sendSystemInfo(`正在连接到直播间${realRoomId}...`);
    //这段代码我觉得需要重构
    this.bili.connect(Number(realRoomId)).subscribe(
      x => {
        if (x.type == "message") { 
          //console.table(x.data);
          if(x.data.cmd=="DANMU_MSG"){
            //fielterhere
            console.log(x.data.info[2][1]+' '+x.data.info[7]);
            var mssg = String(x.data.info[1]);
            if(mssg.indexOf('哔哩哔哩 (゜-゜)つロ 干杯~')!=-1){
              return;//
            }
            if(mssg==this.lastDanmaku){
              if(mssg!="awsl"&&mssg!="草"&&mssg.indexOf("888")==-1){//防止重复刷
                return;
              }
            }
            this.lastDanmaku=mssg;
            this.bili.avatarPreload(x.data.info[2][0]).subscribe(
              c=>{
                if(c){
                  this.sendDanmaku({
                    type:'msg',
                    username:x.data.info[2][1],
                    message:x.data.info[1],
                    userid:x.data.info[2][0]
                  });
                }else{
                  this.sendDanmaku({
                    type:'msg',
                    username:x.data.info[2][1],
                    message:x.data.info[1],
                    userid:0
                  });
                }
              }
            )
          }
          else if(x.data.cmd=="SEND_GIFT"){
            if(x.data.data.coin_type!="gold"){//gold/silver
              return;
            }
            var value = x.data.data.total_coin;
            if(value<50*1000){//计算用的scale
              return;
            }
            this.bili.avatarPreload(x.data.data.uid).subscribe(
              c=>{
                if(c){
                  this.sendDanmaku({
                    type:'gift',
                    username:x.data.data.uname,
                    userid:x.data.data.uid,
                    gift:x.data.data.giftName,
                    amount:x.data.data.num,
                    value:value/1000
                  });
                }
                else{
                  this.sendDanmaku({
                    type:'gift',
                    username:x.data.data.uname,
                    userid:0,
                    gift:x.data.data.giftName,
                    amount:x.data.data.num,
                    value:value/1000
                  });
                }
              }
            )
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
        this.start(realRoomId);//重连
      }
    );
  }

  private sendSystemInfo(msg){
    this.sendDanmaku({
      type:'msg',
      username:'BILICHAT',
      message:msg,
      userid:-1
    });
  }

  private sendDanmaku(msg){
    this.waitForRendering.push(msg);
  }

  ngAfterViewChecked() {
    if (!isPlatformBrowser(this.plat)) {
      return;
    }
  }
}
