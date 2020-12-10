import { Observable } from 'rxjs';
import { AsWebSocket } from './ws';
import { inflate } from 'pako';
import { Message, TextMessage } from 'shared/gamma/message';
import { CommentSource } from './source';
import { BilibiliWebSocket } from 'isomorphic-danmaku';

export class BilibiliSource implements CommentSource{

    readonly type = "bilibili";

    connect({ roomId, server, showJapaneseSC,  }) {
        return new Observable((observer) => {
            const ws = new AsWebSocket();
            // 简易coroutine模型
            (async () => {
                let errorCounter = 0;
                if(errorCounter>3){
                    observer.error(new Error('Failed to connect to server.'));
                    observer.complete();
                    return;
                }
                while (!observer.closed) {
                    try{
                        for await (let msg of BilibiliWebSocket({
                            roomId: roomId
                        })){
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
                    catch{

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


function packageHeartbeat() {
    const body = new TextEncoder().encode('[object Object]');
    return packageBinary(2, body);
}

function packageBinary(type: number, body: Uint8Array) {
    const tmp = new Uint8Array(16 + body.byteLength);
    const headDataView = new DataView(tmp.buffer);
    headDataView.setInt32(0, tmp.byteLength);
    headDataView.setInt16(4, 16);
    headDataView.setInt16(6, 1);
    headDataView.setInt32(8, type); // verify
    headDataView.setInt32(12, 1);
    tmp.set(body, 16);
    return tmp;
}

function packageObject(type: number, bufferObj: any) {
    return packageBinary(type, new TextEncoder().encode(JSON.stringify(bufferObj)));
}

function decodeData(buffer: ArrayBuffer): Array<BilibiliMsg> {
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
                packs.push(...decodeData(inflate(section)));
            }
        }
        offset += view.getInt32(offset);
    }
    return packs;
};

type BilibiliMsg = {
    cmd: "DANMU_MSG";
    info: any[];
} | {
    cmd: "SEND_GIFT";
    data: {
        coin_type: "gold" | "silver",
        uid: number,
        uname: string,
        giftName: string;
        num: number
    }
} | {
    cmd: "GUARD_BUY";
    data: {
        uid: number;
        username: string;
        gift_name: string;
        num: number;
        price: number;
        guard_level: number;
    }
} | {
    cmd: "SUPER_CHAT_MESSAGE_JPN";
    data: {
        uid: number;
        user_info: {
            uname: string;
            face: string;
        };
        price: number;
        message_jpn: string;
        message: string;
    }
} | {
    cmd: "WELCOME_GUARD";
    data: {
        uid: number;
        username: string;
        guard_level: number;
    }
} | {
    cmd: "INTERACT_WORD";
    data: {
        contribution: {
            grade: number;
        },
        identities: [number];
        is_spread: number;
        msg_type: number;
        roomid: number;
        uid:string;
        uname: string;
        uname_color: string;
    }
} | {
    cmd: "COMBO_SEND",
    data:{
        gift_id: number;
        gift_name: string;
        gift_nun: string;
        is_show: number;
        uid: number;
        uname: string;
        action: string;
        batch_combo_id: string;
        batch_combo_num: number;
        combi_id:string;
        combo: number;
        combo_total_coin: number;
    }
} | {
    cmd: "ROOM_REAL_TIME_MESSAGE_UPDATA";
    data: {
        fans: number;
        fans_club: number;
        roomid: number;
        red_notice: number;
    }
} | {
    cmd: "PREPARING";
    roomid: number;
}