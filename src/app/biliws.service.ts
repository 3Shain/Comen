import { Injectable } from '@angular/core';
import { Observable, Subject, race, timer, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiliwsService {

  private ws: WebSocket;

  constructor(private http: HttpClient) {
  }
  
  connect(roomid: number): Observable<any> {
    this.ws = new WebSocket("wss://broadcastlv.chat.bilibili.com:2245/sub");
    this.ws.binaryType = "arraybuffer";
    return new Observable(
      observer => {
        this.ws.onopen = (e) => {
          var obj = {
            uid: 0,
            roomid: Number(roomid),
            protover: 1,
            platform: "web",
            clientver: "1.5.15"
          };
          this.sendPackageObj(7, obj);
          observer.next({ type: 'open' });
          setInterval(() => { this.sendHeartbeat() }, 30000);
        };
        this.ws.onmessage = (e) => {
          var arr = new Uint8Array(e.data);
          var view = new DataView(arr.buffer);
          var offset = 0;
          while (offset < arr.byteLength) {
            var type = view.getInt32(8 + offset);
            var section = arr.slice(offset + view.getInt16(4 + offset), view.getInt32(offset) + offset);
            offset += view.getInt32(offset);
            //后面不要操作offset了
            if (type == 5) {
              observer.next({ type: 'message',data:JSON.parse(new TextDecoder().decode(section)) });
            }
          }
        };
        this.ws.onerror = (e) => {
          //observer.next({ type: 'error' });
          observer.error(e);
        };
        this.ws.onclose = (e) => {
          //observer.next({ type: 'close' });
          observer.complete();
        };
      }
    );
  }

  avatarPreload(userid:number):Observable<boolean>{
    var img = new Image();
    img.src=`${environment.api_server}/v1/bilichat/avatar/${userid}`;
    return race(
      timer(1000).pipe(
        map(x=>false)
      ),
      fromEvent(img,'load').pipe(
        map(x=>true),
      ),
      fromEvent(img,'error').pipe(
        map(x=>false)
      )
    );
  }

  private sendHeartbeat() {
    var body = new TextEncoder().encode("[object Object]");
    this.sendPackageBinary(2, body);
  }

  private sendPackageBinary(type: number, body: Uint8Array) {
    var head = new ArrayBuffer(16);
    var headDataView = new DataView(head);
    headDataView.setInt32(0, head.byteLength + body.byteLength);
    headDataView.setInt16(4, 16);
    headDataView.setInt16(6, 1);
    headDataView.setInt32(8, type);//verify
    headDataView.setInt32(12, 1);

    var tmp = new Uint8Array(16 + body.byteLength);
    tmp.set(new Uint8Array(head), 0);
    tmp.set(body, 16);

    this.ws.send(tmp);
  }

  private sendPackageObj(type: number, bufferObj: any) {
    this.sendPackageBinary(type, new TextEncoder().encode(JSON.stringify(bufferObj)));
  }
}
