import got from 'got';
import { BilibiliDanmuInfo, BilibiliGiftConfig, BilibiliHistoryDanmaku, BilibiliRoomInfo } from 'isomorphic-danmaku';
import { BilibiliGetDanmuInfoResponse, BilibiliGetHistoryResponse, BilibiliGiftConfigResponse, BilibiliRoomInitResponse } from './types';

export async function getBilibiliRoomInfo(roomId: number, options?: {
    fetchGift: boolean,
    fetchHistoryDanmaku: boolean
}) {
    //Todo: error control
    const roomInfo = (await got.get(`https://api.live.bilibili.com/room/v1/Room/room_init?id=${roomId}`, {
        responseType: 'json'
    })).body as BilibiliRoomInitResponse;

    const realRoomId = roomInfo.data.room_id;

    const danmuInfo = (await got.get(`https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=${realRoomId}&type=0`,
        {
            responseType: 'json'
        })).body as BilibiliGetDanmuInfoResponse;

    let ret: {
        roomInfo: BilibiliRoomInfo,
        danmuInfo: BilibiliDanmuInfo,
        giftInfo?: {
            list: BilibiliGiftConfig[]
        },
        history?: {
            admin: BilibiliHistoryDanmaku[],
            room: BilibiliHistoryDanmaku[]
        }
    } = {
        roomInfo: roomInfo.data,
        danmuInfo: danmuInfo.data,
    };

    if (options?.fetchGift) {
        const giftInfo = (await got.get(`https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/giftConfig?platform=pc&room_id=${realRoomId}`, {
            responseType: 'json'
        })).body as BilibiliGiftConfigResponse;
        ret = {
            ...ret,
            giftInfo: giftInfo.data
        }
    }
    if (options?.fetchHistoryDanmaku) {
        const history = (await got.get(`https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory?roomid=${realRoomId}`, {
            responseType: 'json'
        })).body as BilibiliGetHistoryResponse;
        ret = {
            ...ret,
            history: history.data
        }
    }

    return ret;
}
