import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { getAcfunRoomInfo } from 'isomorphic-danmaku/server';

@Controller('acfun')
export class AcfunController {
    constructor(){
        
    }

    @Get('getRoomInfo')
    async getRoomInfo(@Query('roomid', ParseIntPipe) roomid: number) {
        await getAcfunRoomInfo(roomid);
    }
}