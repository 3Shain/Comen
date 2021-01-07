/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import * as Long from 'long';
import { ZtDrawGiftInfo } from './ZtDrawGiftInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonActionSignalGift {
  /**
   * userInfo
   */
  user: ZtLiveUserInfo | undefined;
  sendTimeMs: Long;
  giftId: Long;
  /**
   * batchSize
   */
  count: number;
  /**
   * comboCount
   */
  combo: number;
  /**
   * rank
   */
  value: Long;
  /**
   * comboKey
   */
  comboId: string;
  slotDisplayDurationMs: Long;
  expireDurationMs: Long;
  drawGiftInfo: ZtDrawGiftInfo | undefined;
}

const baseCommonActionSignalGift: object = {
  sendTimeMs: Long.ZERO,
  giftId: Long.ZERO,
  count: 0,
  combo: 0,
  value: Long.ZERO,
  comboId: "",
  slotDisplayDurationMs: Long.ZERO,
  expireDurationMs: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonActionSignalGift = {
  encode(message: CommonActionSignalGift, writer: Writer = Writer.create()): Writer {
    if (message.user !== undefined && message.user !== undefined) {
      ZtLiveUserInfo.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.sendTimeMs);
    writer.uint32(24).int64(message.giftId);
    writer.uint32(32).int32(message.count);
    writer.uint32(40).int32(message.combo);
    writer.uint32(48).int64(message.value);
    writer.uint32(58).string(message.comboId);
    writer.uint32(64).int64(message.slotDisplayDurationMs);
    writer.uint32(72).int64(message.expireDurationMs);
    if (message.drawGiftInfo !== undefined && message.drawGiftInfo !== undefined) {
      ZtDrawGiftInfo.encode(message.drawGiftInfo, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonActionSignalGift {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonActionSignalGift } as CommonActionSignalGift;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.sendTimeMs = reader.int64() as Long;
          break;
        case 3:
          message.giftId = reader.int64() as Long;
          break;
        case 4:
          message.count = reader.int32();
          break;
        case 5:
          message.combo = reader.int32();
          break;
        case 6:
          message.value = reader.int64() as Long;
          break;
        case 7:
          message.comboId = reader.string();
          break;
        case 8:
          message.slotDisplayDurationMs = reader.int64() as Long;
          break;
        case 9:
          message.expireDurationMs = reader.int64() as Long;
          break;
        case 10:
          message.drawGiftInfo = ZtDrawGiftInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonActionSignalGift {
    const message = { ...baseCommonActionSignalGift } as CommonActionSignalGift;
    if (object.user !== undefined && object.user !== null) {
      message.user = ZtLiveUserInfo.fromJSON(object.user);
    } else {
      message.user = undefined;
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = Long.fromString(object.sendTimeMs);
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    if (object.giftId !== undefined && object.giftId !== null) {
      message.giftId = Long.fromString(object.giftId);
    } else {
      message.giftId = Long.ZERO;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Number(object.count);
    } else {
      message.count = 0;
    }
    if (object.combo !== undefined && object.combo !== null) {
      message.combo = Number(object.combo);
    } else {
      message.combo = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Long.fromString(object.value);
    } else {
      message.value = Long.ZERO;
    }
    if (object.comboId !== undefined && object.comboId !== null) {
      message.comboId = String(object.comboId);
    } else {
      message.comboId = "";
    }
    if (object.slotDisplayDurationMs !== undefined && object.slotDisplayDurationMs !== null) {
      message.slotDisplayDurationMs = Long.fromString(object.slotDisplayDurationMs);
    } else {
      message.slotDisplayDurationMs = Long.ZERO;
    }
    if (object.expireDurationMs !== undefined && object.expireDurationMs !== null) {
      message.expireDurationMs = Long.fromString(object.expireDurationMs);
    } else {
      message.expireDurationMs = Long.ZERO;
    }
    if (object.drawGiftInfo !== undefined && object.drawGiftInfo !== null) {
      message.drawGiftInfo = ZtDrawGiftInfo.fromJSON(object.drawGiftInfo);
    } else {
      message.drawGiftInfo = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonActionSignalGift>): CommonActionSignalGift {
    const message = { ...baseCommonActionSignalGift } as CommonActionSignalGift;
    if (object.user !== undefined && object.user !== null) {
      message.user = ZtLiveUserInfo.fromPartial(object.user);
    } else {
      message.user = undefined;
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = object.sendTimeMs as Long;
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    if (object.giftId !== undefined && object.giftId !== null) {
      message.giftId = object.giftId as Long;
    } else {
      message.giftId = Long.ZERO;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count;
    } else {
      message.count = 0;
    }
    if (object.combo !== undefined && object.combo !== null) {
      message.combo = object.combo;
    } else {
      message.combo = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value as Long;
    } else {
      message.value = Long.ZERO;
    }
    if (object.comboId !== undefined && object.comboId !== null) {
      message.comboId = object.comboId;
    } else {
      message.comboId = "";
    }
    if (object.slotDisplayDurationMs !== undefined && object.slotDisplayDurationMs !== null) {
      message.slotDisplayDurationMs = object.slotDisplayDurationMs as Long;
    } else {
      message.slotDisplayDurationMs = Long.ZERO;
    }
    if (object.expireDurationMs !== undefined && object.expireDurationMs !== null) {
      message.expireDurationMs = object.expireDurationMs as Long;
    } else {
      message.expireDurationMs = Long.ZERO;
    }
    if (object.drawGiftInfo !== undefined && object.drawGiftInfo !== null) {
      message.drawGiftInfo = ZtDrawGiftInfo.fromPartial(object.drawGiftInfo);
    } else {
      message.drawGiftInfo = undefined;
    }
    return message;
  },
  toJSON(message: CommonActionSignalGift): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? ZtLiveUserInfo.toJSON(message.user) : undefined);
    message.sendTimeMs !== undefined && (obj.sendTimeMs = (message.sendTimeMs || Long.ZERO).toString());
    message.giftId !== undefined && (obj.giftId = (message.giftId || Long.ZERO).toString());
    message.count !== undefined && (obj.count = message.count);
    message.combo !== undefined && (obj.combo = message.combo);
    message.value !== undefined && (obj.value = (message.value || Long.ZERO).toString());
    message.comboId !== undefined && (obj.comboId = message.comboId);
    message.slotDisplayDurationMs !== undefined && (obj.slotDisplayDurationMs = (message.slotDisplayDurationMs || Long.ZERO).toString());
    message.expireDurationMs !== undefined && (obj.expireDurationMs = (message.expireDurationMs || Long.ZERO).toString());
    message.drawGiftInfo !== undefined && (obj.drawGiftInfo = message.drawGiftInfo ? ZtDrawGiftInfo.toJSON(message.drawGiftInfo) : undefined);
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