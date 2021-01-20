
type BadgeInfo = {
    type: string;
    aria_label?: string;
    badge: string | Blob;
}

type RichTextNode = {
    type: 'text';
    content: string;
} | {
    type: 'image';
    url: string;
    width?: number;
    height?: number;
    style?: string;
} | {
    type: 'emoji';
    url: string;
}

type RichText = {
    nodes: RichTextNode[];
}

type PlatformBase = {
    platformUserId: number;
    platformUserLevel: number;
    platformUserExtra: unknown;
}

type BaseTextMessage = {
    avatar: string | Blob;
    username: string;

    // extensions
    badges: BadgeInfo[];
    usertype: number; // 0 normal 1 member 2 mod 3 both (bit)
    platformUserId: number;
    platformUserLevel: number;
    platformUserExtra: unknown;
}

type TextMessage = {
    type: 'text';
    content: string;
} & BaseTextMessage;

type RichTextMessage = {
    type: 'richtext';
    richtext: RichText;
} & BaseTextMessage;

type PaidMessage = {
    type: 'paid';
    content: string;
    avatar: string | Blob;
    username: string;
    itemInfo: string; // e.g.: $500
    price: number;

    // extension
    platformUserId: number;
}

type MemberMessage = {
    type: 'member';
    avatar: string | Blob;
    username: string;
    itemInfo: string; // e.g.: Welcome to ...

    price: number;

    //extension
    platformMemberType: number;
    platformUserId: number;
    platformPrice: number;
}

type StickerMessage = {
    type: 'sticker';
    avatar: string | Blob;
    username: string;
    sticker: string | Blob;
    itemInfo: string; // name:
    price: number;
    amount: number;

    //extension
    platformUserId: number;
    // 非真实价值
    platformPrice: number;
}

// Special
type FoldMessage = {
    type: 'fold';
    targetMessage: TextMessage;
}

type BlankMessage = {
    type: 'blank';
}

type SystemMessage = {
    type: 'system';
    // eslint-disable-next-line
    data: any;
}

type LiveStartMessage = {
    type: 'livestart';
}

type LiveStopMessage = {
    type: 'livestop';
}


type Message = TextMessage | PaidMessage | MemberMessage | StickerMessage
    | FoldMessage | RichTextMessage | SystemMessage | LiveStartMessage | LiveStopMessage | BlankMessage;

export {
    TextMessage, PaidMessage, MemberMessage, StickerMessage,
    Message, RichTextMessage, BlankMessage, SystemMessage, LiveStartMessage, LiveStopMessage
};

export { RichText, RichTextNode };
