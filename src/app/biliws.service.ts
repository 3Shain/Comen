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

  public lastRenderInvoke:number;
  public lastRenderPush:number;

  private _ownerId : number;
  public get ownerId() : number {
    return this._ownerId;
  }
  public set ownerId(v : number) {
    this._ownerId = v;
  }
  
  

  constructor(private http: HttpClient,
    private proc: MessageProcessorService) {
  }

  connect(roomid: number): Observable<IMessage> {
    this.ws = new WebSocket('wss://broadcastlv.chat.bilibili.com:2245/sub');
    this.ws.binaryType = 'arraybuffer';
    return new Observable(
      observer => {
        this.ws.onopen = (e) => {
          const obj = {
            uid: 0,
            roomid: Number(roomid),
            protover: 1,
            platform: 'web',
            clientver: '1.5.15'
          };
          this.sendPackageObj(7, obj);
          this.heartbeatHandler = setInterval(() => { this.sendHeartbeat(); }, 30000);
          observer.next(new ConnectedMessage());
        };
        this.ws.onmessage = (e) => {
          if(Date.now() - this.lastRenderInvoke > 1000){
            console.log('Window Inavtive');
            return;
          }
          const arr = new Uint8Array(e.data);
          const view = new DataView(arr.buffer);
          let offset = 0;
          while (offset < arr.byteLength) {
            const type = view.getInt32(8 + offset);
            const section = arr.slice(offset + view.getInt16(4 + offset), view.getInt32(offset) + offset);
            offset += view.getInt32(offset);
            // 后面不要操作offset了
            if (type === 5) {
              this.proc.formMessage(JSON.parse(new TextDecoder().decode(section)), observer);
            }
          }
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
    const body = new TextEncoder().encode('[object Object]');
    this.sendPackageBinary(2, body);
  }

  private sendPackageBinary(type: number, body: Uint8Array) {
    const head = new ArrayBuffer(16);
    const headDataView = new DataView(head);
    headDataView.setInt32(0, head.byteLength + body.byteLength);
    headDataView.setInt16(4, 16);
    headDataView.setInt16(6, 1);
    headDataView.setInt32(8, type); // verify
    headDataView.setInt32(12, 1);

    const tmp = new Uint8Array(16 + body.byteLength);
    tmp.set(new Uint8Array(head), 0);
    tmp.set(body, 16);

    this.ws.send(tmp);
  }

  private sendPackageObj(type: number, bufferObj: any) {
    this.sendPackageBinary(type, new TextEncoder().encode(JSON.stringify(bufferObj)));
  }
}
