interface IMessage {
    uid: number;
    username: string;
    type: string;
    mode:DisplayMode;
    avatarUrl:string;
}

class DanmakuMessage implements IMessage {
    constructor(
        public uid: number,
        public username: string,
        public message: string,
        public guard: number,
        public is_admin: boolean,
        public avatarUrl:string='https://static.hdslb.com/images/member/noface.gif',
        public type= 'danmaku',
        public mode=1,
        public repeat=1) {}
}

class GiftMessage implements IMessage {
    constructor(
        public uid: number,
        public username: string,
        public gift: string,
        public amount: number,
        public value: number,
        public guard_type:number,
        public avatarUrl:string='https://static.hdslb.com/images/member/noface.gif',
        public type= 'gift',
        public mode=2) {}
}

class ConnectedMessage implements IMessage {
    constructor(
        public uid: number= 0,
        public username: string= null,
        public avatarUrl:string =null,
        public type= 'connected',
        public mode=1
    ) {}
}

enum DisplayMode{
    Danmaku=1,
    Gift=2,
    Both=3
}

export {IMessage, DanmakuMessage, GiftMessage, ConnectedMessage,DisplayMode};
