import { Controller, Get, Query, ParseIntPipe, Post, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller('bili')
export class BilibiliController {
    constructor(@Inject(CACHE_MANAGER) private cache: Cache) {

    }

    @Post('probe')
    probe() {

    }

    @Get('getRoomInfo')
    getRoomInfo(@Query('roomid', ParseIntPipe) roomid: number) {

    }

    @Get('getAvatar')
    async getAvatar(@Query('uid', ParseIntPipe) uid: number) {
        // cache
        const cached = await this.cache.get<{ url: string; }>(`bili_avt_${uid}`);
        if(cached){
            // just return~
        } else {
            // check status?
            // fetch now or insert into batch list
        }
    }
}