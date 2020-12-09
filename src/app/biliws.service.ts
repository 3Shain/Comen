import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageProcessorService } from './message-processor.service';
import { IMessage, ConnectedMessage } from './danmaku.def';
import { inflate } from 'pako';

const bufferDecoder = (buffer: Uint8Array): Array<Object> => {
  const arr = new Uint8Array(buffer);
  const view = new DataView(arr.buffer);
  const packs = [];
  let offset = 0;
  while (offset < arr.byteLength) {
    const protocol = view.getInt16(6 + offset);
    const type = view.getInt32(8 + offset);
    if (type === 5) {
      const section = arr.slice(offset + view.getInt16(4 + offset), view.getInt32(offset) + offset);
      if (protocol === 0) {
        packs.push(JSON.parse(new TextDecoder().decode(section)));
      }
      if (protocol === 2) {
        packs.push(...bufferDecoder(inflate(section)));
      }
    }
    offset += view.getInt32(offset);
  }
  return packs;
};

@Injectable({
  providedIn: 'root'
})
export class BiliwsService {

  private ws: WebSocket;

  private heartbeatHandler: any;

  public lastRenderInvoke: number;
  public lastRenderPush: number;

  private _ownerId: number;
  public get ownerId(): number {
    return this._ownerId;
  }
  public set ownerId(v: number) {
    this._ownerId = v;
  }



  constructor(private http: HttpClient,
    private proc: MessageProcessorService) {
  }

  connect(roomid: number): Observable<IMessage> {
    this.ws = new WebSocket('wss://hw-sh-live-comet-01.chat.bilibili.com/sub');
    this.ws.binaryType = 'arraybuffer';
    return new Observable(
      observer => {
        this.ws.onopen = (e) => {
          const obj = {
            uid: 0,
            roomid: Number(roomid),
            protover: 2,
            platform: 'web',
            clientver: '1.5.15'
          };
          this.sendPackageObj(7, obj);
          this.heartbeatHandler = setInterval(() => { this.sendHeartbeat(); }, 30000);
          observer.next(new ConnectedMessage());
        };
        this.ws.onmessage = (e) => {
          if (Date.now() - this.lastRenderInvoke > 1000) {
            console.log('Window Inactive');
            return;
          }
          const packs = bufferDecoder(e.data);
          packs.forEach(section => this.proc.formMessage(section, observer));
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
