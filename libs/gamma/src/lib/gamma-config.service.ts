import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BLUE, ColorInfo, CYAN, MAGNET, ORANGE, RED, YELLOW, YELLOW_GREEN } from './consts';
import { MessageProvider, MESSAGE_PROVIDER } from './message-provider';

export interface GammaConfiguration {
    hideTimestamp: boolean;
    tickerDisplayThreshold: number;
    disableSmoother: boolean;
    maxDanmakuNumber: number;
}

export const DEFAULT_GAMMA_CONFIGURATION:GammaConfiguration = {
    hideTimestamp: false,
    tickerDisplayThreshold: 50,
    disableSmoother: false,
    maxDanmakuNumber: 100
}

@Injectable()
export class GammaConfigService {

    //mutable :ascending order
    private colorInfoList = [CYAN, YELLOW_GREEN, YELLOW, ORANGE, MAGNET, RED].sort((a, b) => a.price_limit - b.price_limit);

    current$: BehaviorSubject<GammaConfiguration> = new BehaviorSubject(DEFAULT_GAMMA_CONFIGURATION);

    constructor(@Optional() @Inject(MESSAGE_PROVIDER) provider: MessageProvider){
        provider?.registerOnConfiguration((config)=>{
            // TODO: validate
            this.current$.next({
                ...DEFAULT_GAMMA_CONFIGURATION,
                ...config,
            });
        });
    }

    getColorInfo(value: number) {
        let lastColorInfo:ColorInfo = BLUE;
        for(const info of this.colorInfoList){
            if(value>=info.price_limit){
                lastColorInfo = info;
            } else {
                break;
            }
        }
        return lastColorInfo;
    }

    setColorInfos(colorInfos: ColorInfo[]){
        this.colorInfoList = colorInfos.sort((a, b) => a.price_limit - b.price_limit);
    }
}