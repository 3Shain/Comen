import { Observable } from 'rxjs';
import { Message, TextMessage } from '@comen/gamma';
import { CommentSource } from './source';
import { connectAcfunLiveWs } from 'isomorphic-danmaku';

export class AcfunSource implements CommentSource {

    // avatar address cache?
    readonly type = "acfun";

    connect({ liveId, serviceToken, acSecurity, userId, enterRoomAttach, tickets }) {
        return new Observable((observer) => {
            // 简易coroutine模型
            const abort = new AbortController();
            (async () => {
                let errorCounter = 0;
                if (errorCounter > 3) {
                    observer.error(new Error('Failed to connect to server.'));
                    observer.complete();
                    return;
                }
                while (!observer.closed) {
                    try{
                        for await (let msg of connectAcfunLiveWs({
                           liveId,
                           serviceToken,
                           acSecurity,
                           enterRoomAttach,
                           tickets,
                           userId,
                           abort
                        } as any)){
                            
                        }
                    }
                    catch (e){
                        throw e;
                    }
                    errorCounter++;
                }
            })();
            return () => {
                abort.abort();
            };
        }).pipe() as Observable<Message>;
    }
}