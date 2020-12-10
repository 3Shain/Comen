import { Injectable } from "@nestjs/common";
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BilibiliService {

    constructor(){
        
    }

    @Cron('45 * * * * *')
    fetchAvatar(){

    }
}