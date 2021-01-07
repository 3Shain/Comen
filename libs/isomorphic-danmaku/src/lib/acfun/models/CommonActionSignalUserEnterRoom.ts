/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonActionSignalUserEnterRoom {
  userInfo: ZtLiveUserInfo | undefined;
  sendTimeMs: Long;
}

const baseCommonActionSignalUserEnterRoom: object = {
  sendTimeMs: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonActionSignalUserEnterRoom = {
  encode(message: CommonActionSignalUserEnterRoom, writer: Writer = Writer.create()): Writer {
    if (message.userInfo !== undefined && message.userInfo !== undefined) {
      ZtLiveUserInfo.encode(message.userInfo, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.sendTimeMs);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonActionSignalUserEnterRoom {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonActionSignalUserEnterRoom } as CommonActionSignalUserEnterRoom;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userInfo = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.sendTimeMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonActionSignalUserEnterRoom {
    const message = { ...baseCommonActionSignalUserEnterRoom } as CommonActionSignalUserEnterRoom;
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = ZtLiveUserInfo.fromJSON(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = Long.fromString(object.sendTimeMs);
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonActionSignalUserEnterRoom>): CommonActionSignalUserEnterRoom {
    const message = { ...baseCommonActionSignalUserEnterRoom } as CommonActionSignalUserEnterRoom;
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = ZtLiveUserInfo.fromPartial(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = object.sendTimeMs as Long;
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    return message;
  },
  toJSON(message: CommonActionSignalUserEnterRoom): unknown {
    const obj: any = {};
    message.userInfo !== undefined && (obj.userInfo = message.userInfo ? ZtLiveUserInfo.toJSON(message.userInfo) : undefined);
    message.sendTimeMs !== undefined && (obj.sendTimeMs = (message.sendTimeMs || Long.ZERO).toString());
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