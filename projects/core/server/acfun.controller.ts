import { Controller, Get, HttpService, ParseIntPipe, Query } from "@nestjs/common";
import { getAcfunRoomInfo } from 'isomorphic-danmaku/server';

@Controller('acfun')
export class AcfunController {
    constructor() {

    }

    @Get('info_prefetch')
    async infoPrefetch(@Query("roomid", ParseIntPipe) roomid: number) {
    
    }
}