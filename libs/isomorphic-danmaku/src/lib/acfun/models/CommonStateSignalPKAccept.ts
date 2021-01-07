/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalPKAccept {
  a: string;
  b: string;
}

const baseCommonStateSignalPKAccept: object = {
  a: "",
  b: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalPKAccept = {
  encode(message: CommonStateSignalPKAccept, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.a);
    writer.uint32(18).string(message.b);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalPKAccept {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalPKAccept } as CommonStateSignalPKAccept;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.string();
          break;
        case 2:
          message.b = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalPKAccept {
    const message = { ...baseCommonStateSignalPKAccept } as CommonStateSignalPKAccept;
    if (object.a !== undefined && object.a !== null) {
      message.a = String(object.a);
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = String(object.b);
    } else {
      message.b = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalPKAccept>): CommonStateSignalPKAccept {
    const message = { ...baseCommonStateSignalPKAccept } as CommonStateSignalPKAccept;
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a;
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = object.b;
    } else {
      message.b = "";
    }
    return message;
  },
  toJSON(message: CommonStateSignalPKAccept): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    message.b !== undefined && (obj.b = message.b);
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