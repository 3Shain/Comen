/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalChatEnd {
  chatId: string;
  endType: CommonStateSignalChatEnd_EndType;
}

const baseCommonStateSignalChatEnd: object = {
  chatId: "",
  endType: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum CommonStateSignalChatEnd_EndType {
  UNKNOWN = 0,
  CANCEL_BY_AUTHOR = 1,
  END_BY_AUTHOR = 2,
  END_BY_GUEST = 3,
  GUEST_REJECT = 4,
  GUEST_TIMEOUT = 5,
  GUEST_HEARTBEAT_TIMEOUT = 6,
  AUTHOR_HEARTBEAT_TIMEOUT = 7,
  UNRECOGNIZED = -1,
}

export function commonStateSignalChatEnd_EndTypeFromJSON(object: any): CommonStateSignalChatEnd_EndType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return CommonStateSignalChatEnd_EndType.UNKNOWN;
    case 1:
    case "CANCEL_BY_AUTHOR":
      return CommonStateSignalChatEnd_EndType.CANCEL_BY_AUTHOR;
    case 2:
    case "END_BY_AUTHOR":
      return CommonStateSignalChatEnd_EndType.END_BY_AUTHOR;
    case 3:
    case "END_BY_GUEST":
      return CommonStateSignalChatEnd_EndType.END_BY_GUEST;
    case 4:
    case "GUEST_REJECT":
      return CommonStateSignalChatEnd_EndType.GUEST_REJECT;
    case 5:
    case "GUEST_TIMEOUT":
      return CommonStateSignalChatEnd_EndType.GUEST_TIMEOUT;
    case 6:
    case "GUEST_HEARTBEAT_TIMEOUT":
      return CommonStateSignalChatEnd_EndType.GUEST_HEARTBEAT_TIMEOUT;
    case 7:
    case "AUTHOR_HEARTBEAT_TIMEOUT":
      return CommonStateSignalChatEnd_EndType.AUTHOR_HEARTBEAT_TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonStateSignalChatEnd_EndType.UNRECOGNIZED;
  }
}

export function commonStateSignalChatEnd_EndTypeToJSON(object: CommonStateSignalChatEnd_EndType): string {
  switch (object) {
    case CommonStateSignalChatEnd_EndType.UNKNOWN:
      return "UNKNOWN";
    case CommonStateSignalChatEnd_EndType.CANCEL_BY_AUTHOR:
      return "CANCEL_BY_AUTHOR";
    case CommonStateSignalChatEnd_EndType.END_BY_AUTHOR:
      return "END_BY_AUTHOR";
    case CommonStateSignalChatEnd_EndType.END_BY_GUEST:
      return "END_BY_GUEST";
    case CommonStateSignalChatEnd_EndType.GUEST_REJECT:
      return "GUEST_REJECT";
    case CommonStateSignalChatEnd_EndType.GUEST_TIMEOUT:
      return "GUEST_TIMEOUT";
    case CommonStateSignalChatEnd_EndType.GUEST_HEARTBEAT_TIMEOUT:
      return "GUEST_HEARTBEAT_TIMEOUT";
    case CommonStateSignalChatEnd_EndType.AUTHOR_HEARTBEAT_TIMEOUT:
      return "AUTHOR_HEARTBEAT_TIMEOUT";
    default:
      return "UNKNOWN";
  }
}

export const CommonStateSignalChatEnd = {
  encode(message: CommonStateSignalChatEnd, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.chatId);
    writer.uint32(16).int32(message.endType);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalChatEnd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalChatEnd } as CommonStateSignalChatEnd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chatId = reader.string();
          break;
        case 2:
          message.endType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalChatEnd {
    const message = { ...baseCommonStateSignalChatEnd } as CommonStateSignalChatEnd;
    if (object.chatId !== undefined && object.chatId !== null) {
      message.chatId = String(object.chatId);
    } else {
      message.chatId = "";
    }
    if (object.endType !== undefined && object.endType !== null) {
      message.endType = commonStateSignalChatEnd_EndTypeFromJSON(object.endType);
    } else {
      message.endType = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalChatEnd>): CommonStateSignalChatEnd {
    const message = { ...baseCommonStateSignalChatEnd } as CommonStateSignalChatEnd;
    if (object.chatId !== undefined && object.chatId !== null) {
      message.chatId = object.chatId;
    } else {
      message.chatId = "";
    }
    if (object.endType !== undefined && object.endType !== null) {
      message.endType = object.endType;
    } else {
      message.endType = 0;
    }
    return message;
  },
  toJSON(message: CommonStateSignalChatEnd): unknown {
    const obj: any = {};
    message.chatId !== undefined && (obj.chatId = message.chatId);
    message.endType !== undefined && (obj.endType = commonStateSignalChatEnd_EndTypeToJSON(message.endType));
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