import { Observable, OperatorFunction } from 'rxjs';
import { Message, TextMessage, StickerMessage, PaidMessage, MemberMessage } from '@comen/gamma';
import { CommentSource } from './source';
import { connectBilibiliLiveWs } from 'isomorphic-danmaku';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class BilibiliSource implements CommentSource {

    readonly type = 'bilibili';

    constructor(private http: HttpClient) { }

    connect({ roomId }) {
        return this.http.get<BilibiliRoominfoResponse>(`/api/bili/getRoomInfo?roomid=${roomId}`).pipe(
            switchMap((msg) => {
                return this._connect(msg);
            }),
            this._avatarPreloadPipe()
        );
    }

    private _connect(resp: BilibiliRoominfoResponse) {
        return new Observable((observer) => {
            const abortController = new AbortController();
            (async () => {
                const errorCounter = 0;
                if (errorCounter > 3) {
                    observer.error(new Error('Failed to connect to server.'));
                    observer.complete();
                    return;
                }
                while (!observer.closed) {
                    try {
                        for await (const msg of connectBilibiliLiveWs({
                            roomId: resp.roomInfo.room_id,
                            abort: abortController
                        }) as AsyncGenerator<BilibiliMsg, unknown, unknown>) {
                            switch (msg.cmd) {
                                case 'DANMU_MSG':
                                    observer.next({
                                        type: 'text',
                                        content: msg.info[1],
                                        avatar: '',
                                        badges: [
                                            ...[guardType[msg.info[7]]
                                            ].filter(Boolean) // TODO: custom badge
                                        ],
                                        username: msg.info[2][1],
                                        usertype: (
                                            (msg.info[7] > 0 ? 0x1 : 0x0) // member
                                            | (msg.info[2][2] == 1 ? 0x2 : 0x0) // moderator
                                        ),
                                        platformUserId: msg.info[2][0],
                                        platformUserExtra: {}
                                    } as TextMessage);
                                    break;
                                case 'SEND_GIFT':
                                    console.log(msg);
                                    observer.next({
                                        type: 'sticker',
                                        sticker: resp.giftInfo.list.find(x => x.id == msg.data.giftId).webp,
                                        avatar: '',
                                        username: msg.data.uname,
                                        amount: msg.data.num,
                                        itemInfo: `${msg.data.action} ${msg.data.giftName} ×${msg.data.num}`,
                                        price: msg.data.coin_type == 'gold' ? msg.data.total_coin * msg.data.num / 1000 : 0,
                                        platformPrice: msg.data.coin_type == 'silver' ? msg.data.total_coin * msg.data.num : 0,
                                        platformUserId: msg.data.uid
                                    } as StickerMessage);
                                    break;
                                case 'GUARD_BUY':
                                    console.log(msg);
                                    observer.next({
                                        type: 'member',
                                        avatar: '',
                                        username: msg.data.username,
                                        price: msg.data.price / 1000,
                                        platformUserId: msg.data.uid,
                                        platformMemberType: msg.data.guard_level,
                                        platformPrice: msg.data.price,
                                        itemInfo: '欢迎加入大航海'
                                    } as MemberMessage);
                                    break;
                                case 'COMBO_SEND':
                                    break;
                                case 'SUPER_CHAT_MESSAGE_JPN':
                                    observer.next({
                                        type: 'paid',
                                        avatar: msg.data.user_info.face,
                                        username: msg.data.user_info.uname,
                                        content: msg.data.message,
                                        itemInfo: `CN¥${msg.data.price}`,
                                        price: msg.data.price,
                                        platformUserId: msg.data.uid,
                                    } as PaidMessage)
                                    break;
                            }
                        }
                    } catch (e) {
                        throw e;
                    }
                }
            })();
            return () => {
                abortController.abort();
            };
        }).pipe() as Observable<Message>;
    }

    private _avatarPreloadPipe(): OperatorFunction<Message, Message> {
        return (upstream) => {
            return new Observable((obs) => {
                return upstream.subscribe({
                    next: (x) => {
                        if (x.type == 'text' || x.type == 'sticker'
                            || x.type == 'member') {
                            this.http.get<{
                                url: string
                            }>(`/api/bili/getAvatar?uid=${x.platformUserId}`).subscribe((ret) => {
                                x.avatar = ret.url;
                                obs.next(x);
                            });
                        } else {
                            obs.next(x);
                        }
                    },
                    error: e => obs.error(e),
                    complete: () => obs.complete()
                });
            });
        }
    }
}

const guardType = {
    1: {
        type: 'member',
        badge: 'https://i0.hdslb.com/bfs/activity-plat/static/20200716/1d0c5a1b042efb59f46d4ba1286c6727/icon-guard1.png@44w_44h.webp'
    },
    2: {
        type: 'member',
        badge: 'https://i0.hdslb.com/bfs/activity-plat/static/20200716/1d0c5a1b042efb59f46d4ba1286c6727/icon-guard2.png@44w_44h.webp'
    },
    3: {
        type: 'member',
        badge: 'https://i0.hdslb.com/bfs/activity-plat/static/20200716/1d0c5a1b042efb59f46d4ba1286c6727/icon-guard3.png@44w_44h.webp'
    }
}

type BilibiliMsg = {
    cmd: 'DANMU_MSG';
    info: any[];
} | {
    cmd: 'SEND_GIFT';
    data: {
        coin_type: 'gold' | 'silver',
        uid: number,
        uname: string,
        giftName: string;
        num: number;
        total_coin: number;
        giftId: number;
        action: string;
    }
} | {
    cmd: 'GUARD_BUY';
    data: {
        uid: number;
        username: string;
        gift_name: string;
        num: number;
        price: number;
        guard_level: number;
    }
} | {
    cmd: 'SUPER_CHAT_MESSAGE_JPN';
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
    cmd: 'WELCOME_GUARD';
    data: {
        uid: number;
        username: string;
        guard_level: number;
    }
} | {
    cmd: 'INTERACT_WORD';
    data: {
        contribution: {
            grade: number;
        },
        identities: [number];
        is_spread: number;
        msg_type: number;
        roomid: number;
        uid: string;
        uname: string;
        uname_color: string;
    }
} | {
    cmd: 'COMBO_SEND',
    data: {
        gift_id: number;
        gift_name: string;
        gift_nun: string;
        is_show: number;
        uid: number;
        uname: string;
        action: string;
        batch_combo_id: string;
        batch_combo_num: number;
        combi_id: string;
        combo: number;
        combo_total_coin: number;
    }
} | {
    cmd: 'ROOM_REAL_TIME_MESSAGE_UPDATA';
    data: {
        fans: number;
        fans_club: number;
        roomid: number;
        red_notice: number;
    }
} | {
    cmd: 'PREPARING';
    roomid: number;
}

type BilibiliRoominfoResponse = {
    roomInfo: {
        room_id: number;
    },
    danmuInfo: {
        token: string;
        host_list: {
            host: string;
            port: number;
            wss_port: number;
            ws_port: number;
        }[]
    },
    giftInfo: {
        list: {
            id: number;
            number: string;
            price: number;
            coin_type: 'silver' | 'gold';
            img_basic: string;
            img_dynamic: string; gift: string;
            webp: string;
        }[]
    }
}