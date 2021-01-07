import got from 'got';
import { Cookie, CookieJar } from 'tough-cookie';
import { promisify } from 'util';
import { AcfunGiftListResponse, AcfunRoomInfoResponse } from './types';

export async function getAcfunRoomInfo(roomId: number) {
    if (!roomId) {
        throw 'NO ROOMID PROVIDED';
    }
    const jar = new CookieJar();
    await got.get('https://live.acfun.cn/', { cookieJar: jar });
    const did = (await promisify(jar.getCookies.bind(jar))('https://acfun.cn/') as Cookie[]).find(s => s.key === '_did').value;
    const loginResp = (await got.post('https://id.app.acfun.cn/rest/app/visitor/login/', {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        responseType: 'json',
        body: "sid=acfun.api.visitor",
        cookieJar: jar
    })).body as { result: number; acSecurity: string; userId: number; 'acfun.api.visitor_st': string; };
    const roomInfo = (await got.post(`https://api.kuaishouzt.com/rest/zt/live/web/startPlay?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB` +
        `&userId=${loginResp.userId}&did=${did}&acfun.api.visitor_st=${loginResp["acfun.api.visitor_st"]}`, {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "referer": `https://live.acfun.cn/live/${roomId}`
        },
        responseType: 'json',
        body: `authorId=${roomId}`,
        cookieJar: jar
    })).body as AcfunRoomInfoResponse;
    if (roomInfo.result != 1) {
        return {
            closed: true,
            acSecurity: loginResp.acSecurity,
            userId: loginResp.userId,
            serviceToken: loginResp["acfun.api.visitor_st"],
        }
    }
    const giftInfo = (await got.post(`https://api.kuaishouzt.com/rest/zt/live/web/gift/list?subBiz=mainApp&kpn`+
    `=ACFUN_APP&kpf=PC_WEB&userId=${loginResp.userId}&did=${did}&acfun.api.visitor_st=${loginResp["acfun.api.visitor_st"]}`, {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "referer": `https://live.acfun.cn/live/${roomId}`
        },
        responseType: 'json',
        body: `visitorId=${loginResp.userId}&liveId=${roomInfo.data.liveId}`,
        cookieJar: jar
    })).body as AcfunGiftListResponse;
    return {
        closed: false,
        acSecurity: loginResp.acSecurity,
        userId: loginResp.userId,
        serviceToken: loginResp["acfun.api.visitor_st"],
        tickets: roomInfo.data.availableTickets,
        enterRoomAttach: roomInfo.data.enterRoomAttach,
        liveId: roomInfo.data.liveId,
        giftInfo: giftInfo.data
    }
}
