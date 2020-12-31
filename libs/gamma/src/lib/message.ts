
type BadgeInfo = {
    type: string;
    aria_label?: string;
    badge: string | Blob;
}

type TextMessage = {
    type: 'text',
    content: string
    avatar: string | Blob;
    username: string;

    // extensions
    badges: BadgeInfo[];
    usertype: number; // 0 normal 1 member 2 mod 3 both (bit)
    platformUserId: number;
    platformUserExtra: unknown;
}

type PaidMessage = {
    type: 'paid',
    content: string;
    avatar: string | Blob;
    username: string;
    itemInfo: string; // e.g.: $500
    price: number;
    
    // extension
    platformUserId: number;
}

type MemberMessage = {
    type: 'member',
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

type Message = TextMessage | PaidMessage | MemberMessage | StickerMessage | FoldMessage;

export { TextMessage, PaidMessage, MemberMessage, StickerMessage, Message };

type PaidTicker = {
    type: 'paid';
    relatedMessage: PaidMessage;
}

type MemberTicker = {
    type: 'member';
    relatedMessage: MemberMessage;
}

type StickerTicker = {
    type: 'sticker';
    relatedMessage: StickerMessage;
}

type Ticker = PaidTicker | MemberTicker | StickerTicker;

export { MemberTicker, PaidTicker, StickerTicker, Ticker };
