/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalChatCall {
  chatId: string;
  liveId: string;
  callTimestampMs: Long;
}

const baseCommonStateSignalChatCall: object = {
  chatId: "",
  liveId: "",
  callTimestampMs: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalChatCall = {
  encode(message: CommonStateSignalChatCall, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.chatId);
    writer.uint32(18).string(message.liveId);
    writer.uint32(24).int64(message.callTimestampMs);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalChatCall {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalChatCall } as CommonStateSignalChatCall;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chatId = reader.string();
          break;
        case 2:
          message.liveId = reader.string();
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
  fromJSON(object: any): CommonStateSignalChatCall {
    const message = { ...baseCommonStateSignalChatCall } as CommonStateSignalChatCall;
    if (object.chatId !== undefined && object.chatId !== null) {
      message.chatId = String(object.chatId);
    } else {
      message.chatId = "";
    }
    if (object.liveId !== undefined && object.liveId !== null) {
      message.liveId = String(object.liveId);
    } else {
      message.liveId = "";
    }
    if (object.callTimestampMs !== undefined && object.callTimestampMs !== null) {
      message.callTimestampMs = Long.fromString(object.callTimestampMs);
    } else {
      message.callTimestampMs = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalChatCall>): CommonStateSignalChatCall {
    const message = { ...baseCommonStateSignalChatCall } as CommonStateSignalChatCall;
    if (object.chatId !== undefined && object.chatId !== null) {
      message.chatId = object.chatId;
    } else {
      message.chatId = "";
    }
    if (object.liveId !== undefined && object.liveId !== null) {
      message.liveId = object.liveId;
    } else {
      message.liveId = "";
    }
    if (object.callTimestampMs !== undefined && object.callTimestampMs !== null) {
      message.callTimestampMs = object.callTimestampMs as Long;
    } else {
      message.callTimestampMs = Long.ZERO;
    }
    return message;
  },
  toJSON(message: CommonStateSignalChatCall): unknown {
    const obj: any = {};
    message.chatId !== undefined && (obj.chatId = message.chatId);
    message.liveId !== undefined && (obj.liveId = message.liveId);
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