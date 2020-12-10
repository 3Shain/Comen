import { Controller, Get, ParseIntPipe, Query, Inject, CACHE_MANAGER, Req, Res } from "@nestjs/common";
import { Cache } from 'cache-manager';
import { Request, Response } from 'express';

@Controller('bili')
export class BilibiliController {

    constructor(@Inject(CACHE_MANAGER) private cache: Cache) {

    }

    @Get('info_prefetch')
    async infoPrefetch(@Query("roomid", ParseIntPipe) roomid: number) {

    }

    @Get('avatar')
    async getAvatar(@Query("uid", ParseIntPipe) uid: number, @Req() req: Request,@Res() res:Response) {
        const cache = await this.cache.get(`bili_avt`) as BilibiliAvatarCache | null;
        if (cache) {
            res.setHeader('Expires-Date','');
            
            // 
        } else {
            //
            await this.cache.set(`bili_avt`,{
                url:""
            },10000); //hold on
        }
    }
}

interface BilibiliAvatarCache {
    url: string;
}