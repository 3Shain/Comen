/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface LocaleMessage {
  locale: string;
  errorMessage: { [key: number]: string };
}

export interface LocaleMessage_ErrorMessageEntry {
  key: number;
  value: string;
}

const baseLocaleMessage: object = {
  locale: "",
};

const baseLocaleMessage_ErrorMessageEntry: object = {
  key: 0,
  value: "",
};

export const protobufPackage = 'AcFunDanmu'

export const LocaleMessage = {
  encode(message: LocaleMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.locale);
    Object.entries(message.errorMessage).forEach(([key, value]) => {
      LocaleMessage_ErrorMessageEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): LocaleMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLocaleMessage } as LocaleMessage;
    message.errorMessage = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.locale = reader.string();
          break;
        case 2:
          const entry2 = LocaleMessage_ErrorMessageEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.errorMessage[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LocaleMessage {
    const message = { ...baseLocaleMessage } as LocaleMessage;
    message.errorMessage = {};
    if (object.locale !== undefined && object.locale !== null) {
      message.locale = String(object.locale);
    } else {
      message.locale = "";
    }
    if (object.errorMessage !== undefined && object.errorMessage !== null) {
      Object.entries(object.errorMessage).forEach(([key, value]) => {
        message.errorMessage[Number(key)] = String(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<LocaleMessage>): LocaleMessage {
    const message = { ...baseLocaleMessage } as LocaleMessage;
    message.errorMessage = {};
    if (object.locale !== undefined && object.locale !== null) {
      message.locale = object.locale;
    } else {
      message.locale = "";
    }
    if (object.errorMessage !== undefined && object.errorMessage !== null) {
      Object.entries(object.errorMessage).forEach(([key, value]) => {
        if (value !== undefined) {
          message.errorMessage[Number(key)] = String(value);
        }
      })
    }
    return message;
  },
  toJSON(message: LocaleMessage): unknown {
    const obj: any = {};
    message.locale !== undefined && (obj.locale = message.locale);
    obj.errorMessage = {};
    if (message.errorMessage) {
      Object.entries(message.errorMessage).forEach(([k, v]) => {
        obj.errorMessage[k] = v;
      })
    }
    return obj;
  },
};

export const LocaleMessage_ErrorMessageEntry = {
  encode(message: LocaleMessage_ErrorMessageEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): LocaleMessage_ErrorMessageEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLocaleMessage_ErrorMessageEntry } as LocaleMessage_ErrorMessageEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LocaleMessage_ErrorMessageEntry {
    const message = { ...baseLocaleMessage_ErrorMessageEntry } as LocaleMessage_ErrorMessageEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = Number(object.key);
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<LocaleMessage_ErrorMessageEntry>): LocaleMessage_ErrorMessageEntry {
    const message = { ...baseLocaleMessage_ErrorMessageEntry } as LocaleMessage_ErrorMessageEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message: LocaleMessage_ErrorMessageEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
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