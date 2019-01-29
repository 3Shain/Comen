import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BiliwsService {

  private ws:WebSocket;

  private roomId:number;

  public obs:Subject<any>;

  constructor(private http:HttpClient) { 
    this.obs = new Subject();
  }

  initial(roomid){
    this.roomId=Number(roomid);//你妈的，这个ts的类型检查就是屑啊
    this.ws=new WebSocket("wss://tx-sh3-live-comet-01.chat.bilibili.com/sub");
    this.ws.binaryType="arraybuffer";
    this.ws.onopen = (e) =>this.sendVerify();
    this.ws.onmessage = (e) =>this.recv(e);
    setInterval(()=>{this.sendHeartbeat()},30000);
  }

  recv(e:MessageEvent){
    var v = new Uint8Array(e.data);
    var view = new DataView(v.buffer);
    var offset = 0;
    while(offset<v.byteLength){
      var type = view.getInt32(8+offset);
      var sec = v.slice(offset+view.getInt16(4+offset),view.getInt32(offset)+offset);
      if(type==5){
        var json = new TextDecoder().decode(sec);
        var obj = JSON.parse(json);
        if(obj.cmd=="DANMU_MSG"){
          //pipe 
          //onmessage -> filter danmu_msg -> get avatar -> go to subscriber
          //心跳包实现
          this.obs.next({username:obj.info[2][1],message:obj.info[1],avatarUid:obj.info[2][0]});
        }
      }
      offset+=view.getInt32(offset);
    }
  }

  sendVerify(){
    var obj =  {
      uid:0,
      roomid:this.roomId,
      protover:1,
      platform:"web",
      clientver:"1.5.15"
    };
    var body = new TextEncoder().encode(JSON.stringify(obj));

    var head = new ArrayBuffer(16);
    var headDataView = new DataView(head);
    headDataView.setInt32(0,head.byteLength+body.byteLength);
    headDataView.setInt16(4,16);
    headDataView.setInt16(6,1);
    headDataView.setInt32(8,7);//verify
    headDataView.setInt32(12,1);

    var tmp = new Uint8Array(16+body.byteLength);
    tmp.set(new Uint8Array(head),0);
    tmp.set(body,16);

    this.ws.send(tmp);
    console.log('verify');

    
    //this.sendHeartbeat();
  }

  sendHeartbeat(){
    var body = new TextEncoder().encode("[object Object]");

    var head = new ArrayBuffer(16);
    var headDataView = new DataView(head);
    headDataView.setInt32(0,head.byteLength+body.byteLength);
    headDataView.setInt16(4,16);
    headDataView.setInt16(6,1);
    headDataView.setInt32(8,2);//heartbeat
    headDataView.setInt32(12,1);

    var tmp = new Uint8Array(16+body.byteLength);
    tmp.set(new Uint8Array(head),0);
    tmp.set(body,16);

    this.ws.send(tmp);
  }
}
