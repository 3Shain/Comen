import { BilibiliDanmuInfo, BilibiliGiftConfig, BilibiliHistoryDanmaku, BilibiliRoomInfo } from 'isomorphic-danmaku';

interface AcfunRoomInfoResponse {
    result: number;
    data: {
        liveId: string;
        availableTickets: string[];
        enterRoomAttach: string;
        videoPlayRes: string;
        caption: string;
        ticketRetryCount: number;
        ticketRetryIntervalMs: number;
        notices: { userId: number; userName: string; userGender: string; notice: string; }[];
        config: {
            giftSlotSize: number;
        };
        liveStartTime: number;
        panoramic: boolean;
    },
    host: string;
}

interface AcfunGiftListResponse {
    result: number;
    data: {
        giftList: {
            allowBatchSendSizeList: number[];
            arLiveName: string;
            canCombo: boolean;
            canDraw: boolean;
            description: string;
            giftId: number;
            giftName: string;
            giftPrice: number;
            magicFaceId: number;
            payWalletType: number;
            pngPicListt: {
                cdn: string;
                freeTraffic: boolean;
                url: string;
                urlPattern: string;
            }[];
            smallPngPicList: {
                cdn: string;
                freeTraffic: boolean;
                url: string;
                urlPattern: string;
            }[];
            webpPicList: {
                cdn: string;
                freeTraffic: boolean;
                url: string;
                urlPattern: string;
            }[];
            redpackPrice: number;
        }[],
        externalDisplayGiftId: number;
        giftListHash: string;
        externalDisplayGiftTipsDelayTime: number;
    },
    host: string;
}

interface BilibiliRoomInitResponse {
    code: number;
    msg: string;
    message: string;
    data: BilibiliRoomInfo;
}

interface BilibiliGetDanmuInfoResponse {
    code: number;
    message: string;
    ttl: number;
    data: BilibiliDanmuInfo;
}

interface BilibiliGiftConfigResponse {
    code: number;
    message: string;
    ttl: number;
    data: {
        list: BilibiliGiftConfig[]
    }
}

interface BilibiliGetHistoryResponse {
    code: number;
    data: {
        admin: BilibiliHistoryDanmaku[],
        room: BilibiliHistoryDanmaku[]
    },
    message: string;
    msg: string;
}

export {
    AcfunGiftListResponse, AcfunRoomInfoResponse, BilibiliRoomInitResponse,
    BilibiliGetDanmuInfoResponse, BilibiliGiftConfigResponse, BilibiliGetHistoryResponse
};