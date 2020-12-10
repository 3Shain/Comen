
type BadgeInfo = {
    badge: string | Blob;
}

type TextMessage = {
    type: "text",
    content: string
    avatar: string | Blob;
    username: string;

    // extensions
    badges: BadgeInfo[];
    usertype: number; // 0 normal 1 member 2 mod 3 both (bit)
    platformUserId: number;
    platformUserExtra: object;
}

type PaidMessage = {
    type: "paid",
    content: string;
    avatar: string | Blob;
    username: string;
    itemInfo: string; // e.g.: $500

    // extension
    platformUserId: number;
}

type MemberMessage = {
    type: "member",
    avatar: string | Blob;
    username: string;
    itemInfo: string; // e.g.: Welcome to ...

    //extension
    platformMemberType: number;
    platformUserId: number;
}

type StickerMessage = {
    type: "sticker";
    sticker: string | Blob;
    itemInfo: string;
}

// Special
type FoldMessage = {
    type: "fold";
    targetMessage: TextMessage;
}

type Message = TextMessage | PaidMessage | MemberMessage | StickerMessage | FoldMessage;

export { TextMessage, PaidMessage, MemberMessage, StickerMessage, Message };

type PaidTicker = {
    type: "paid";
    relatedMessage: PaidMessage;
}

type MemberTicker = {
    type: "member";
    relatedMessage: MemberMessage;
}

type StickerTicker = {
    type: "sticker";
    relatedMessage: StickerMessage;
}

type Ticker = PaidTicker | MemberTicker | StickerTicker;

export { MemberTicker, PaidTicker, StickerTicker, Ticker };

