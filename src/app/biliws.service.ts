import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class BiliwsService {

  private ws:WebSocket;

  private roomId:number;

  constructor() { }

  initial(roomid){
    console.log('fuck');
    this.roomId=roomid;
    this.ws=new WebSocket("wss://broadcastlv.chat.bilibili.com:2245/sub");
    this.ws.binaryType="arraybuffer";
    this.ws.onopen = (e) =>this.copen(e);
    this.ws.onmessage = (e) =>this.recv(e);
  }

  copen(ev:Event){
    console.log("server start");
    var obj =  {
      uid:0,
      roomid:this.roomId,
      protover:1,
      platform:"web",
      clientver:"1.5.15"
    };
    var str = JSON.stringify(obj);

    var stru8Array = new TextEncoder().encode(str);

    var headbuffer = new ArrayBuffer(16);
    var view = new DataView(headbuffer);
    view.setInt32(0,headbuffer.byteLength+stru8Array.byteLength);
    view.setInt16(4,16);
    view.setInt16(6,1);
    view.setInt32(8,7);//verify
    view.setInt32(12,1);

    var tmp = new Uint8Array(16+stru8Array.byteLength);
    tmp.set(new Uint8Array(headbuffer),0);
    tmp.set(stru8Array,16);

    this.ws.send(tmp);

  }

  recv(e:MessageEvent){
    var v = new Uint8Array(e.data);
    var view = new DataView(v.buffer);
    var offset = 0;
    while(offset<v.byteLength){
      var length = view.getInt32(0+offset);
      var type = view.getInt32(8+offset);
      var sec = v.slice(offset+view.getInt16(4+offset),length+offset);
      if(type==5){
        var json = new TextDecoder().decode(sec);
        var obj = JSON.parse(json);
        console.table(obj);
      }
      offset+=length;
    }
  }
}
