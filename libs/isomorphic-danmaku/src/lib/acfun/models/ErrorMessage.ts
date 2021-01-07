/* eslint-disable */
import { LocaleMessage } from './LocaleMessage';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ErrorMessage {
  localeMessages: LocaleMessage[];
}

const baseErrorMessage: object = {
};

export const protobufPackage = 'AcFunDanmu'

export const ErrorMessage = {
  encode(message: ErrorMessage, writer: Writer = Writer.create()): Writer {
    for (const v of message.localeMessages) {
      LocaleMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ErrorMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseErrorMessage } as ErrorMessage;
    message.localeMessages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localeMessages.push(LocaleMessage.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ErrorMessage {
    const message = { ...baseErrorMessage } as ErrorMessage;
    message.localeMessages = [];
    if (object.localeMessages !== undefined && object.localeMessages !== null) {
      for (const e of object.localeMessages) {
        message.localeMessages.push(LocaleMessage.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ErrorMessage>): ErrorMessage {
    const message = { ...baseErrorMessage } as ErrorMessage;
    message.localeMessages = [];
    if (object.localeMessages !== undefined && object.localeMessages !== null) {
      for (const e of object.localeMessages) {
        message.localeMessages.push(LocaleMessage.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ErrorMessage): unknown {
    const obj: any = {};
    if (message.localeMessages) {
      obj.localeMessages = message.localeMessages.map(e => e ? LocaleMessage.toJSON(e) : undefined);
    } else {
      obj.localeMessages = [];
    }
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