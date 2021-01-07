/* eslint-disable */
import * as Long from 'long';
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonActionSignalComment {
  content: string;
  sendTimeMs: Long;
  userInfo: ZtLiveUserInfo | undefined;
}

const baseCommonActionSignalComment: object = {
  content: "",
  sendTimeMs: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonActionSignalComment = {
  encode(message: CommonActionSignalComment, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.content);
    writer.uint32(16).int64(message.sendTimeMs);
    if (message.userInfo !== undefined && message.userInfo !== undefined) {
      ZtLiveUserInfo.encode(message.userInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonActionSignalComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonActionSignalComment } as CommonActionSignalComment;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.content = reader.string();
          break;
        case 2:
          message.sendTimeMs = reader.int64() as Long;
          break;
        case 3:
          message.userInfo = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonActionSignalComment {
    const message = { ...baseCommonActionSignalComment } as CommonActionSignalComment;
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = Long.fromString(object.sendTimeMs);
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = ZtLiveUserInfo.fromJSON(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonActionSignalComment>): CommonActionSignalComment {
    const message = { ...baseCommonActionSignalComment } as CommonActionSignalComment;
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = object.sendTimeMs as Long;
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = ZtLiveUserInfo.fromPartial(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    return message;
  },
  toJSON(message: CommonActionSignalComment): unknown {
    const obj: any = {};
    message.content !== undefined && (obj.content = message.content);
    message.sendTimeMs !== undefined && (obj.sendTimeMs = (message.sendTimeMs || Long.ZERO).toString());
    message.userInfo !== undefined && (obj.userInfo = message.userInfo ? ZtLiveUserInfo.toJSON(message.userInfo) : undefined);
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