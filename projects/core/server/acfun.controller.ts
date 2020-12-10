import { Controller, Get, HttpService, ParseIntPipe, Query } from "@nestjs/common";
import { exhaustMap } from 'rxjs/operators';
import got from 'got';
import { Cookie, CookieJar } from 'tough-cookie';
import { promisify } from 'util';
import fetch from 'node-fetch';

@Controller('acfun')
export class AcfunController {
    constructor() {

    }

    @Get('info_prefetch')
    async infoPrefetch(@Query("roomid", ParseIntPipe) roomid: number) {
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
                "referer": `https://live.acfun.cn/live/${roomid}`
            },
            responseType: 'json',
            body: `authorId=${roomid}`,
            cookieJar: jar
        })).body as ACRoomInfo;

        // const giftInfo = (await got.post(`https://api.kuaishouzt.com/rest/zt/live/web/gift/list?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB` +
        //     `&userId=${loginResp.userId}&did=${did}&acfun.api.visitor_st=${loginResp["acfun.api.visitor_st"]}`, {
        //     headers: {
        //         "content-type": "application/x-www-form-urlencoded",
        //         "referer": `https://live.acfun.cn/live/${roomid}`
        //     },
        //     responseType: 'json',
        //     body: `visitorId=${loginResp.userId}&liveId=${roomInfo.data.liveId}`,
        //     cookieJar: jar
        // })).body as ACGiftList;
        console.log(roomInfo);

        return {
            data: {
                acSecurity: loginResp.acSecurity,
                userId: loginResp.userId,
                serviceToken: loginResp["acfun.api.visitor_st"],
                tickets: roomInfo.data.availableTickets,
                enterRoomAttach: roomInfo.data.enterRoomAttach,
                liveId: roomInfo.data.liveId
                // giftInfo: 
            }
        }
    }
}

type ACRoomInfo = {
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
};

type ACGiftList = {
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