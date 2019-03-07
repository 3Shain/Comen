import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageProcessorService } from './message-processor.service';
import { IMessage, ConnectedMessage } from './danmaku.def';

@Injectable({
  providedIn: 'root'
})
export class BiliwsService {

  private ws: WebSocket;

  private heartbeatHandler: any;

  constructor(private http: HttpClient,
    private proc: MessageProcessorService) {
  }

  connect(roomid: number): Observable<IMessage> {
    this.ws = new WebSocket("wss://tx-hk-live-comet-01.chat.bilibili.com/sub");
    this.ws.binaryType = "blob";
    return new Observable(
      observer => {
        let that = this;
        this.ws.onopen = (e) => {
          let obj = {
            uid: 0,
            roomid: Number(roomid),
            protover: 1,
            platform: "web",
            clientver: "1.5.15"
          };
          this.sendPackageObj(7, obj);
          this.heartbeatHandler = setInterval(() => { this.sendHeartbeat() }, 30000);
          observer.next(new ConnectedMessage());
        };
        this.ws.onmessage = (e) => {
          let data = e.data;
          var reader = new FileReader();
          reader.onload = function (e) {
            let arr = new Uint8Array(<ArrayBuffer>reader.result);
            let view = new DataView(arr.buffer);
            let offset = 0;
            while (offset < arr.byteLength) {
              let type = view.getInt32(8 + offset);
              let section = arr.slice(offset + view.getInt16(4 + offset), view.getInt32(offset) + offset);
              offset += view.getInt32(offset);
              //后面不要操作offset了
              if (type == 5) {
                that.proc.formMessage(JSON.parse(new TextDecoder().decode(section)), observer);
              }
            }
          };
          reader.readAsArrayBuffer(data);
        };
        this.ws.onerror = (e) => {
          observer.error(e);
        };
        this.ws.onclose = (e) => {
          clearInterval(this.heartbeatHandler);
          observer.complete();
        };
      }
    );
  }

  private sendHeartbeat() {
    let body = new TextEncoder().encode("[object Object]");
    this.sendPackageBinary(2, body);
  }

  private sendPackageBinary(type: number, body: Uint8Array) {
    let head = new ArrayBuffer(16);
    let headDataView = new DataView(head);
    headDataView.setInt32(0, head.byteLength + body.byteLength);
    headDataView.setInt16(4, 16);
    headDataView.setInt16(6, 1);
    headDataView.setInt32(8, type);//verify
    headDataView.setInt32(12, 1);

    let tmp = new Uint8Array(16 + body.byteLength);
    tmp.set(new Uint8Array(head), 0);
    tmp.set(body, 16);

    this.ws.send(tmp);
  }

  private sendPackageObj(type: number, bufferObj: any) {
    this.sendPackageBinary(type, new TextEncoder().encode(JSON.stringify(bufferObj)));
  }
}
