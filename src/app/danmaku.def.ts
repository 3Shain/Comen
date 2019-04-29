interface IMessage {
    uid: number;
    username: string;
    type: string;
    mode:DisplayMode;
}

class DanmakuMessage implements IMessage {
    constructor(
        public uid: number,
        public username: string,
        public message: string,
        public guard: number,
        public is_admin: boolean,
        public type= 'danmaku',
        public mode=1) {}
}

class GiftMessage {
    constructor(
        public uid: number,
        public username: string,
        public gift: string,
        public amount: number,
        public value: number,
        public guard_type:number,
        public type= 'gift',
        public mode=2) {}
}

class ConnectedMessage implements IMessage {
    constructor(
        public uid: number= 0,
        public username: string= null,
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
