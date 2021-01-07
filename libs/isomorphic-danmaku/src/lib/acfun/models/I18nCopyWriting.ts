/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface I18nCopyWriting {
  formatKey: string;
  formatParam: string[];
}

const baseI18nCopyWriting: object = {
  formatKey: "",
  formatParam: "",
};

export const protobufPackage = 'AcFunDanmu'

export const I18nCopyWriting = {
  encode(message: I18nCopyWriting, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.formatKey);
    for (const v of message.formatParam) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): I18nCopyWriting {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseI18nCopyWriting } as I18nCopyWriting;
    message.formatParam = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.formatKey = reader.string();
          break;
        case 2:
          message.formatParam.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): I18nCopyWriting {
    const message = { ...baseI18nCopyWriting } as I18nCopyWriting;
    message.formatParam = [];
    if (object.formatKey !== undefined && object.formatKey !== null) {
      message.formatKey = String(object.formatKey);
    } else {
      message.formatKey = "";
    }
    if (object.formatParam !== undefined && object.formatParam !== null) {
      for (const e of object.formatParam) {
        message.formatParam.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<I18nCopyWriting>): I18nCopyWriting {
    const message = { ...baseI18nCopyWriting } as I18nCopyWriting;
    message.formatParam = [];
    if (object.formatKey !== undefined && object.formatKey !== null) {
      message.formatKey = object.formatKey;
    } else {
      message.formatKey = "";
    }
    if (object.formatParam !== undefined && object.formatParam !== null) {
      for (const e of object.formatParam) {
        message.formatParam.push(e);
      }
    }
    return message;
  },
  toJSON(message: I18nCopyWriting): unknown {
    const obj: any = {};
    message.formatKey !== undefined && (obj.formatKey = message.formatKey);
    if (message.formatParam) {
      obj.formatParam = message.formatParam.map(e => e);
    } else {
      obj.formatParam = [];
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