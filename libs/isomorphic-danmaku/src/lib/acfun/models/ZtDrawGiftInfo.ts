/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtDrawGiftInfo {
  screenWidth: Long;
  screenHeight: Long;
  drawPoint: ZtDrawGiftInfo_ZtDrawPoint[];
}

export interface ZtDrawGiftInfo_ZtDrawPoint {
  marginLeft: Long;
  marginTop: Long;
  scaleRatio: number;
  handup: boolean;
}

const baseZtDrawGiftInfo: object = {
  screenWidth: Long.ZERO,
  screenHeight: Long.ZERO,
};

const baseZtDrawGiftInfo_ZtDrawPoint: object = {
  marginLeft: Long.ZERO,
  marginTop: Long.ZERO,
  scaleRatio: 0,
  handup: false,
};

export const protobufPackage = 'AcFunDanmu'

export const ZtDrawGiftInfo = {
  encode(message: ZtDrawGiftInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.screenWidth);
    writer.uint32(16).int64(message.screenHeight);
    for (const v of message.drawPoint) {
      ZtDrawGiftInfo_ZtDrawPoint.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtDrawGiftInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtDrawGiftInfo } as ZtDrawGiftInfo;
    message.drawPoint = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.screenWidth = reader.int64() as Long;
          break;
        case 2:
          message.screenHeight = reader.int64() as Long;
          break;
        case 3:
          message.drawPoint.push(ZtDrawGiftInfo_ZtDrawPoint.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtDrawGiftInfo {
    const message = { ...baseZtDrawGiftInfo } as ZtDrawGiftInfo;
    message.drawPoint = [];
    if (object.screenWidth !== undefined && object.screenWidth !== null) {
      message.screenWidth = Long.fromString(object.screenWidth);
    } else {
      message.screenWidth = Long.ZERO;
    }
    if (object.screenHeight !== undefined && object.screenHeight !== null) {
      message.screenHeight = Long.fromString(object.screenHeight);
    } else {
      message.screenHeight = Long.ZERO;
    }
    if (object.drawPoint !== undefined && object.drawPoint !== null) {
      for (const e of object.drawPoint) {
        message.drawPoint.push(ZtDrawGiftInfo_ZtDrawPoint.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtDrawGiftInfo>): ZtDrawGiftInfo {
    const message = { ...baseZtDrawGiftInfo } as ZtDrawGiftInfo;
    message.drawPoint = [];
    if (object.screenWidth !== undefined && object.screenWidth !== null) {
      message.screenWidth = object.screenWidth as Long;
    } else {
      message.screenWidth = Long.ZERO;
    }
    if (object.screenHeight !== undefined && object.screenHeight !== null) {
      message.screenHeight = object.screenHeight as Long;
    } else {
      message.screenHeight = Long.ZERO;
    }
    if (object.drawPoint !== undefined && object.drawPoint !== null) {
      for (const e of object.drawPoint) {
        message.drawPoint.push(ZtDrawGiftInfo_ZtDrawPoint.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ZtDrawGiftInfo): unknown {
    const obj: any = {};
    message.screenWidth !== undefined && (obj.screenWidth = (message.screenWidth || Long.ZERO).toString());
    message.screenHeight !== undefined && (obj.screenHeight = (message.screenHeight || Long.ZERO).toString());
    if (message.drawPoint) {
      obj.drawPoint = message.drawPoint.map(e => e ? ZtDrawGiftInfo_ZtDrawPoint.toJSON(e) : undefined);
    } else {
      obj.drawPoint = [];
    }
    return obj;
  },
};

export const ZtDrawGiftInfo_ZtDrawPoint = {
  encode(message: ZtDrawGiftInfo_ZtDrawPoint, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.marginLeft);
    writer.uint32(16).int64(message.marginTop);
    writer.uint32(25).double(message.scaleRatio);
    writer.uint32(32).bool(message.handup);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtDrawGiftInfo_ZtDrawPoint {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtDrawGiftInfo_ZtDrawPoint } as ZtDrawGiftInfo_ZtDrawPoint;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marginLeft = reader.int64() as Long;
          break;
        case 2:
          message.marginTop = reader.int64() as Long;
          break;
        case 3:
          message.scaleRatio = reader.double();
          break;
        case 4:
          message.handup = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtDrawGiftInfo_ZtDrawPoint {
    const message = { ...baseZtDrawGiftInfo_ZtDrawPoint } as ZtDrawGiftInfo_ZtDrawPoint;
    if (object.marginLeft !== undefined && object.marginLeft !== null) {
      message.marginLeft = Long.fromString(object.marginLeft);
    } else {
      message.marginLeft = Long.ZERO;
    }
    if (object.marginTop !== undefined && object.marginTop !== null) {
      message.marginTop = Long.fromString(object.marginTop);
    } else {
      message.marginTop = Long.ZERO;
    }
    if (object.scaleRatio !== undefined && object.scaleRatio !== null) {
      message.scaleRatio = Number(object.scaleRatio);
    } else {
      message.scaleRatio = 0;
    }
    if (object.handup !== undefined && object.handup !== null) {
      message.handup = Boolean(object.handup);
    } else {
      message.handup = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtDrawGiftInfo_ZtDrawPoint>): ZtDrawGiftInfo_ZtDrawPoint {
    const message = { ...baseZtDrawGiftInfo_ZtDrawPoint } as ZtDrawGiftInfo_ZtDrawPoint;
    if (object.marginLeft !== undefined && object.marginLeft !== null) {
      message.marginLeft = object.marginLeft as Long;
    } else {
      message.marginLeft = Long.ZERO;
    }
    if (object.marginTop !== undefined && object.marginTop !== null) {
      message.marginTop = object.marginTop as Long;
    } else {
      message.marginTop = Long.ZERO;
    }
    if (object.scaleRatio !== undefined && object.scaleRatio !== null) {
      message.scaleRatio = object.scaleRatio;
    } else {
      message.scaleRatio = 0;
    }
    if (object.handup !== undefined && object.handup !== null) {
      message.handup = object.handup;
    } else {
      message.handup = false;
    }
    return message;
  },
  toJSON(message: ZtDrawGiftInfo_ZtDrawPoint): unknown {
    const obj: any = {};
    message.marginLeft !== undefined && (obj.marginLeft = (message.marginLeft || Long.ZERO).toString());
    message.marginTop !== undefined && (obj.marginTop = (message.marginTop || Long.ZERO).toString());
    message.scaleRatio !== undefined && (obj.scaleRatio = message.scaleRatio);
    message.handup !== undefined && (obj.handup = message.handup);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;