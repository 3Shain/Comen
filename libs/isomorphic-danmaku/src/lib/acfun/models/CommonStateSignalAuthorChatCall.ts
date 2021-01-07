/* eslint-disable */
import { AuthorChatPlayerInfo } from './AuthorChatPlayerInfo';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalAuthorChatCall {
  authorChatId: string;
  inviterUserInfo: AuthorChatPlayerInfo | undefined;
  callTimestampMs: Long;
}

const baseCommonStateSignalAuthorChatCall: object = {
  authorChatId: "",
  callTimestampMs: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalAuthorChatCall = {
  encode(message: CommonStateSignalAuthorChatCall, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.authorChatId);
    if (message.inviterUserInfo !== undefined && message.inviterUserInfo !== undefined) {
      AuthorChatPlayerInfo.encode(message.inviterUserInfo, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int64(message.callTimestampMs);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalAuthorChatCall {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalAuthorChatCall } as CommonStateSignalAuthorChatCall;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authorChatId = reader.string();
          break;
        case 2:
          message.inviterUserInfo = AuthorChatPlayerInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.callTimestampMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalAuthorChatCall {
    const message = { ...baseCommonStateSignalAuthorChatCall } as CommonStateSignalAuthorChatCall;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = String(object.authorChatId);
    } else {
      message.authorChatId = "";
    }
    if (object.inviterUserInfo !== undefined && object.inviterUserInfo !== null) {
      message.inviterUserInfo = AuthorChatPlayerInfo.fromJSON(object.inviterUserInfo);
    } else {
      message.inviterUserInfo = undefined;
    }
    if (object.callTimestampMs !== undefined && object.callTimestampMs !== null) {
      message.callTimestampMs = Long.fromString(object.callTimestampMs);
    } else {
      message.callTimestampMs = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalAuthorChatCall>): CommonStateSignalAuthorChatCall {
    const message = { ...baseCommonStateSignalAuthorChatCall } as CommonStateSignalAuthorChatCall;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = object.authorChatId;
    } else {
      message.authorChatId = "";
    }
    if (object.inviterUserInfo !== undefined && object.inviterUserInfo !== null) {
      message.inviterUserInfo = AuthorChatPlayerInfo.fromPartial(object.inviterUserInfo);
    } else {
      message.inviterUserInfo = undefined;
    }
    if (object.callTimestampMs !== undefined && object.callTimestampMs !== null) {
      message.callTimestampMs = object.callTimestampMs as Long;
    } else {
      message.callTimestampMs = Long.ZERO;
    }
    return message;
  },
  toJSON(message: CommonStateSignalAuthorChatCall): unknown {
    const obj: any = {};
    message.authorChatId !== undefined && (obj.authorChatId = message.authorChatId);
    message.inviterUserInfo !== undefined && (obj.inviterUserInfo = message.inviterUserInfo ? AuthorChatPlayerInfo.toJSON(message.inviterUserInfo) : undefined);
    message.callTimestampMs !== undefined && (obj.callTimestampMs = (message.callTimestampMs || Long.ZERO).toString());
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