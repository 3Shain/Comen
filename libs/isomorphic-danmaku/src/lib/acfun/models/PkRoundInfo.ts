/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface PkRoundInfo {
  a: Long;
  b: number;
  c: number;
  d: Long;
  /**
   * enum
   */
  e: number;
}

const basePkRoundInfo: object = {
  a: Long.ZERO,
  b: 0,
  c: 0,
  d: Long.ZERO,
  e: 0,
};

export const protobufPackage = 'AcFunDanmu'

export const PkRoundInfo = {
  encode(message: PkRoundInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.a);
    writer.uint32(16).int32(message.b);
    writer.uint32(24).int32(message.c);
    writer.uint32(32).int64(message.d);
    writer.uint32(40).int32(message.e);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PkRoundInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePkRoundInfo } as PkRoundInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.int64() as Long;
          break;
        case 2:
          message.b = reader.int32();
          break;
        case 3:
          message.c = reader.int32();
          break;
        case 4:
          message.d = reader.int64() as Long;
          break;
        case 5:
          message.e = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PkRoundInfo {
    const message = { ...basePkRoundInfo } as PkRoundInfo;
    if (object.a !== undefined && object.a !== null) {
      message.a = Long.fromString(object.a);
    } else {
      message.a = Long.ZERO;
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = Number(object.b);
    } else {
      message.b = 0;
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = Number(object.c);
    } else {
      message.c = 0;
    }
    if (object.d !== undefined && object.d !== null) {
      message.d = Long.fromString(object.d);
    } else {
      message.d = Long.ZERO;
    }
    if (object.e !== undefined && object.e !== null) {
      message.e = Number(object.e);
    } else {
      message.e = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PkRoundInfo>): PkRoundInfo {
    const message = { ...basePkRoundInfo } as PkRoundInfo;
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a as Long;
    } else {
      message.a = Long.ZERO;
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = object.b;
    } else {
      message.b = 0;
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = object.c;
    } else {
      message.c = 0;
    }
    if (object.d !== undefined && object.d !== null) {
      message.d = object.d as Long;
    } else {
      message.d = Long.ZERO;
    }
    if (object.e !== undefined && object.e !== null) {
      message.e = object.e;
    } else {
      message.e = 0;
    }
    return message;
  },
  toJSON(message: PkRoundInfo): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = (message.a || Long.ZERO).toString());
    message.b !== undefined && (obj.b = message.b);
    message.c !== undefined && (obj.c = message.c);
    message.d !== undefined && (obj.d = (message.d || Long.ZERO).toString());
    message.e !== undefined && (obj.e = message.e);
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