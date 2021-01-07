/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import { ChatMediaType, chatMediaTypeFromJSON, chatMediaTypeToJSON } from './ChatMediaType';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalChatReady {
  chatId: string;
  guestUserInfo: ZtLiveUserInfo | undefined;
  mediaType: ChatMediaType;
}

const baseCommonStateSignalChatReady: object = {
  chatId: "",
  mediaType: 0,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalChatReady = {
  encode(message: CommonStateSignalChatReady, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.chatId);
    if (message.guestUserInfo !== undefined && message.guestUserInfo !== undefined) {
      ZtLiveUserInfo.encode(message.guestUserInfo, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int32(message.mediaType);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalChatReady {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalChatReady } as CommonStateSignalChatReady;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chatId = reader.string();
          break;
        case 2:
          message.guestUserInfo = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.mediaType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalChatReady {
    const message = { ...baseCommonStateSignalChatReady } as CommonStateSignalChatReady;
    if (object.chatId !== undefined && object.chatId !== null) {
      message.chatId = String(object.chatId);
    } else {
      message.chatId = "";
    }
    if (object.guestUserInfo !== undefined && object.guestUserInfo !== null) {
      message.guestUserInfo = ZtLiveUserInfo.fromJSON(object.guestUserInfo);
    } else {
      message.guestUserInfo = undefined;
    }
    if (object.mediaType !== undefined && object.mediaType !== null) {
      message.mediaType = chatMediaTypeFromJSON(object.mediaType);
    } else {
      message.mediaType = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalChatReady>): CommonStateSignalChatReady {
    const message = { ...baseCommonStateSignalChatReady } as CommonStateSignalChatReady;
    if (object.chatId !== undefined && object.chatId !== null) {
      message.chatId = object.chatId;
    } else {
      message.chatId = "";
    }
    if (object.guestUserInfo !== undefined && object.guestUserInfo !== null) {
      message.guestUserInfo = ZtLiveUserInfo.fromPartial(object.guestUserInfo);
    } else {
      message.guestUserInfo = undefined;
    }
    if (object.mediaType !== undefined && object.mediaType !== null) {
      message.mediaType = object.mediaType;
    } else {
      message.mediaType = 0;
    }
    return message;
  },
  toJSON(message: CommonStateSignalChatReady): unknown {
    const obj: any = {};
    message.chatId !== undefined && (obj.chatId = message.chatId);
    message.guestUserInfo !== undefined && (obj.guestUserInfo = message.guestUserInfo ? ZtLiveUserInfo.toJSON(message.guestUserInfo) : undefined);
    message.mediaType !== undefined && (obj.mediaType = chatMediaTypeToJSON(message.mediaType));
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