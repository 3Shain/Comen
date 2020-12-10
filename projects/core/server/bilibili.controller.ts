import { Controller, Get, ParseIntPipe, Query, Inject, CACHE_MANAGER, Req, Res } from "@nestjs/common";
import { Cache } from 'cache-manager';
import { Request, Response } from 'express';
import { getBilibiliRoomInfo } from 'isomorphic-danmaku/server';

@Controller('bili')
export class BilibiliController {

    constructor(@Inject(CACHE_MANAGER) private cache: Cache) { }

    @Get('info_prefetch')
    async infoPrefetch(@Query("roomid", ParseIntPipe) roomid: number) {
        const info = await getBilibiliRoomInfo(roomid, {
            fetchGift: true,
            fetchHistoryDanmaku: false
        });
        // TODO: cache logic
        // TODO: normalize api
        return info;
    }

    @Get('avatar')
    async getAvatar(@Query("uid", ParseIntPipe) uid: number, @Req() req: Request, @Res() res: Response) {
        const cache = await this.cache.get(`bili_avt`) as BilibiliAvatarCache | null;
        // cache logic
        if (cache) {
            res.setHeader('Cache-Control', 'max-age=86400');
            return cache;
        } else {
            // eager fetch
            // lazy fetch
            await this.cache.set(`bili_avt`, {
                url: ""
            }, 10000); //hold on
        }
    }
}

// fetch user: https://api.bilibili.com/x/space/acc/info?mid=${}

interface BilibiliAvatarCache {
    refreshing?: boolean;
    url: string;
}