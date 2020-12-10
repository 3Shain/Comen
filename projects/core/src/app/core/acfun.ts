import { Observable } from 'rxjs';
import { AsWebSocket } from './ws';
import { Message, TextMessage } from 'shared/gamma/message';
import { CommentSource } from './source';
import { AcfunWebsocket } from 'isomorphic-danmaku';

export class AcfunSource implements CommentSource {

    // avatar address cache?
    readonly type = "acfun";

    connect({ liveId, serviceToken, acSecurity, userId, enterRoomAttach, tickets }) {
        return new Observable((observer) => {
            const ws = new AsWebSocket();
            // 简易coroutine模型
            (async () => {
                let errorCounter = 0;
                if (errorCounter > 3) {
                    observer.error(new Error('Failed to connect to server.'));
                    observer.complete();
                    return;
                }
                while (!observer.closed) {
                    try{
                        for await (let msg of AcfunWebsocket({
                           liveId,
                           serviceToken,
                           acSecurity,
                           enterRoomAttach,
                           tickets,
                           userId
                        } as any)){
                            if(msg.cmd==="DANMU_MSG") {
                                observer.next({
                                    type:"text",
                                    username: msg.info[2][1],
                                    avatar: msg.info[2][0], 
                                    //need to further process,in fact it is uid
                                    badges:[],
                                    content:msg.info[1]
                                } as TextMessage);
                            } else if(msg.cmd==="SEND_GIFT"){

                            } else if(msg.cmd==="SUPER_CHAT_MESSAGE_JPN"){

                            } else if(msg.cmd==="GUARD_BUY"){

                            }
                             else {
                                console.log(msg);
                            }
                        }
                    }
                    catch (e){
                        throw e;
                    }
                    errorCounter++;
                }
            })();
            return () => {
                ws.close();
            };
        }).pipe() as Observable<Message>;
    }
}