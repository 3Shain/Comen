/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalAuthorChatAccept {
  authorChatId: string;
  aryaSignalInfo: string;
}

const baseCommonStateSignalAuthorChatAccept: object = {
  authorChatId: "",
  aryaSignalInfo: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalAuthorChatAccept = {
  encode(message: CommonStateSignalAuthorChatAccept, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.authorChatId);
    writer.uint32(18).string(message.aryaSignalInfo);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalAuthorChatAccept {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalAuthorChatAccept } as CommonStateSignalAuthorChatAccept;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authorChatId = reader.string();
          break;
        case 2:
          message.aryaSignalInfo = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalAuthorChatAccept {
    const message = { ...baseCommonStateSignalAuthorChatAccept } as CommonStateSignalAuthorChatAccept;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = String(object.authorChatId);
    } else {
      message.authorChatId = "";
    }
    if (object.aryaSignalInfo !== undefined && object.aryaSignalInfo !== null) {
      message.aryaSignalInfo = String(object.aryaSignalInfo);
    } else {
      message.aryaSignalInfo = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalAuthorChatAccept>): CommonStateSignalAuthorChatAccept {
    const message = { ...baseCommonStateSignalAuthorChatAccept } as CommonStateSignalAuthorChatAccept;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = object.authorChatId;
    } else {
      message.authorChatId = "";
    }
    if (object.aryaSignalInfo !== undefined && object.aryaSignalInfo !== null) {
      message.aryaSignalInfo = object.aryaSignalInfo;
    } else {
      message.aryaSignalInfo = "";
    }
    return message;
  },
  toJSON(message: CommonStateSignalAuthorChatAccept): unknown {
    const obj: any = {};
    message.authorChatId !== undefined && (obj.authorChatId = message.authorChatId);
    message.aryaSignalInfo !== undefined && (obj.aryaSignalInfo = message.aryaSignalInfo);
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