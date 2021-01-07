/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalDisplayInfo {
  watchingCount: string;
  likeCount: string;
  likeDelta: number;
}

const baseCommonStateSignalDisplayInfo: object = {
  watchingCount: "",
  likeCount: "",
  likeDelta: 0,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalDisplayInfo = {
  encode(message: CommonStateSignalDisplayInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.watchingCount);
    writer.uint32(18).string(message.likeCount);
    writer.uint32(24).int32(message.likeDelta);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalDisplayInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalDisplayInfo } as CommonStateSignalDisplayInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.watchingCount = reader.string();
          break;
        case 2:
          message.likeCount = reader.string();
          break;
        case 3:
          message.likeDelta = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalDisplayInfo {
    const message = { ...baseCommonStateSignalDisplayInfo } as CommonStateSignalDisplayInfo;
    if (object.watchingCount !== undefined && object.watchingCount !== null) {
      message.watchingCount = String(object.watchingCount);
    } else {
      message.watchingCount = "";
    }
    if (object.likeCount !== undefined && object.likeCount !== null) {
      message.likeCount = String(object.likeCount);
    } else {
      message.likeCount = "";
    }
    if (object.likeDelta !== undefined && object.likeDelta !== null) {
      message.likeDelta = Number(object.likeDelta);
    } else {
      message.likeDelta = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalDisplayInfo>): CommonStateSignalDisplayInfo {
    const message = { ...baseCommonStateSignalDisplayInfo } as CommonStateSignalDisplayInfo;
    if (object.watchingCount !== undefined && object.watchingCount !== null) {
      message.watchingCount = object.watchingCount;
    } else {
      message.watchingCount = "";
    }
    if (object.likeCount !== undefined && object.likeCount !== null) {
      message.likeCount = object.likeCount;
    } else {
      message.likeCount = "";
    }
    if (object.likeDelta !== undefined && object.likeDelta !== null) {
      message.likeDelta = object.likeDelta;
    } else {
      message.likeDelta = 0;
    }
    return message;
  },
  toJSON(message: CommonStateSignalDisplayInfo): unknown {
    const obj: any = {};
    message.watchingCount !== undefined && (obj.watchingCount = message.watchingCount);
    message.likeCount !== undefined && (obj.likeCount = message.likeCount);
    message.likeDelta !== undefined && (obj.likeDelta = message.likeDelta);
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