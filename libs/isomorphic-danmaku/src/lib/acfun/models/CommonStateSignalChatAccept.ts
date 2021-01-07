/* eslint-disable */
import { ChatMediaType, chatMediaTypeFromJSON, chatMediaTypeToJSON } from './ChatMediaType';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalChatAccept {
  chatId: string;
  mediaType: ChatMediaType;
  arraySignalInfo: string;
}

const baseCommonStateSignalChatAccept: object = {
  chatId: "",
  mediaType: 0,
  arraySignalInfo: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalChatAccept = {
  encode(message: CommonStateSignalChatAccept, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.chatId);
    writer.uint32(16).int32(message.mediaType);
    writer.uint32(26).string(message.arraySignalInfo);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalChatAccept {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalChatAccept } as CommonStateSignalChatAccept;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chatId = reader.string();
          break;
        case 2:
          message.mediaType = reader.int32() as any;
          break;
        case 3:
          message.arraySignalInfo = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalChatAccept {
    const message = { ...baseCommonStateSignalChatAccept } as CommonStateSignalChatAccept;
    if (object.chatId !== undefined && object.chatId !== null) {
      message.chatId = String(object.chatId);
    } else {
      message.chatId = "";
    }
    if (object.mediaType !== undefined && object.mediaType !== null) {
      message.mediaType = chatMediaTypeFromJSON(object.mediaType);
    } else {
      message.mediaType = 0;
    }
    if (object.arraySignalInfo !== undefined && object.arraySignalInfo !== null) {
      message.arraySignalInfo = String(object.arraySignalInfo);
    } else {
      message.arraySignalInfo = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalChatAccept>): CommonStateSignalChatAccept {
    const message = { ...baseCommonStateSignalChatAccept } as CommonStateSignalChatAccept;
    if (object.chatId !== undefined && object.chatId !== null) {
      message.chatId = object.chatId;
    } else {
      message.chatId = "";
    }
    if (object.mediaType !== undefined && object.mediaType !== null) {
      message.mediaType = object.mediaType;
    } else {
      message.mediaType = 0;
    }
    if (object.arraySignalInfo !== undefined && object.arraySignalInfo !== null) {
      message.arraySignalInfo = object.arraySignalInfo;
    } else {
      message.arraySignalInfo = "";
    }
    return message;
  },
  toJSON(message: CommonStateSignalChatAccept): unknown {
    const obj: any = {};
    message.chatId !== undefined && (obj.chatId = message.chatId);
    message.mediaType !== undefined && (obj.mediaType = chatMediaTypeToJSON(message.mediaType));
    message.arraySignalInfo !== undefined && (obj.arraySignalInfo = message.arraySignalInfo);
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