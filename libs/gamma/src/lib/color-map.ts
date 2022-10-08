import { Injectable } from '@angular/core';
import {
  BLUE,
  ColorInfo,
  CYAN,
  MAGNET,
  ORANGE,
  RED,
  YELLOW,
  YELLOW_GREEN,
} from './consts';

@Injectable()
export class GammaColorMap {
  //mutable :ascending order
  private colorInfoList = [
    CYAN,
    YELLOW_GREEN,
    YELLOW,
    ORANGE,
    MAGNET,
    RED,
  ].sort((a, b) => a.price_limit - b.price_limit);

  getColorInfo(value: number) {
    let lastColorInfo: ColorInfo = BLUE;
    for (const info of this.colorInfoList) {
      if (value >= info.price_limit) {
        lastColorInfo = info;
      } else {
        break;
      }
    }
    return lastColorInfo;
  }

  setColorInfos(colorInfos: ColorInfo[]) {
    this.colorInfoList = colorInfos.sort(
      (a, b) => a.price_limit - b.price_limit
    );
  }
}
